const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Classe auxiliar para conexão com o banco de dados.
// O ideal é que isto fique em um arquivo de configuração separado (ex: config/db.js).
class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            connectTimeout: 10000 // 10 segundos de timeout para conexão
        });
    }

    async query(sql, params) {
        const [results, ] = await this.pool.execute(sql, params);
        return results;
    }
}

const db = new Database();

class UsuarioModel {
    constructor(id, email, senha, perfil_id, pessoa_id) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.perfil_id = perfil_id;
        this.pessoa_id = pessoa_id;
    }

    /**
     * Busca um usuário pelo e-mail e anexa seu perfil e permissões.
     */
    async obterPorEmail(email) {
        const usuarioRows = await db.query(
            `SELECT u.*, p.slug as perfil_slug
             FROM tb_usuario u
             JOIN tb_perfil p ON u.perfil_id = p.id
             WHERE u.email = ?`,
            [email]
        );

        if (usuarioRows.length === 0) {
            return null;
        }

        const usuarioData = usuarioRows[0];

        const permissoesRows = await db.query(
            `SELECT p.slug
             FROM tb_permissao p
             JOIN tb_perfil_permissao pp ON p.id = pp.permissao_id
             WHERE pp.perfil_id = ?`,
            [usuarioData.perfil_id]
        );

        return {
            id: usuarioData.id,
            email: usuarioData.email,
            senha: usuarioData.senha,
            perfil: {
                id: usuarioData.perfil_id,
                slug: usuarioData.perfil_slug
            },
            permissoes: permissoesRows
        };
    }

    /**
     * Busca um usuário pelo ID para carregar dados na view.
     */
    async obterPorId(id) {
        const rows = await db.query(
            `SELECT u.id, u.email, u.perfil_id,
                    p.nome as pessoa_nome,
                    perf.nome as perfil_nome, perf.slug as perfil_slug
             FROM tb_usuario u
             LEFT JOIN tb_pessoa p ON u.pessoa_id = p.id
             JOIN tb_perfil perf ON u.perfil_id = perf.id
             WHERE u.id = ?`,
            [id]
        );

        if (rows.length > 0) {
            const data = rows[0];
            return { id: data.id, nome: data.pessoa_nome, email: data.email, perfil_id: data.perfil_id };
        }
        return null;
    }

    /**
     * Cria um novo usuário e a pessoa associada em uma transação.
     */
    async criar(nome, email, senha, telefone, nascimento) {
        const connection = await db.pool.getConnection();
        try {
            // Verificar se o e-mail já existe
            const usuarioExistente = await this.obterPorEmail(email);
            if (usuarioExistente) {
                const error = new Error('E-mail já cadastrado.');
                error.code = 'ER_DUP_ENTRY';
                throw error;
            }

            await connection.beginTransaction();

            // 1. Inserir na tb_pessoa com tipo 'Adotante'
            const [pessoaResult] = await connection.execute(
                'INSERT INTO tb_pessoa (pess_nome, pess_tipo, pess_tel, pess_nasc) VALUES (?, ?, ?, ?)',
                [nome, 'Adotante', telefone, nascimento]
            );
            const pessoaId = pessoaResult.insertId;

            // 2. Hash da senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // 3. Inserir na tb_usuario com perfil 3 e ativo
            const [usuarioResult] = await connection.execute(
                'INSERT INTO tb_usuario (pess_id, perf_id, usu_email, usu_senha, usu_ativo) VALUES (?, ?, ?, ?, ?)',
                [pessoaId, 3, email, senhaHash, 1]
            );

            await connection.commit();
            return { success: true, userId: usuarioResult.insertId };

        } catch (error) {
            await connection.rollback();
            throw error; // Re-throw para o controller
        } finally {
            connection.release();
        }
    }
}

module.exports = UsuarioModel;