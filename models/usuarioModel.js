const bcrypt = require('bcryptjs');
const Database = require('../utils/database');

const db = new Database();

class UsuarioModel {
    constructor(id, email, senha, perfil_id, pess_id) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.perfil_id = perfil_id;
        this.pess_id = pess_id;
    }

    /**
     * Busca um usuário pelo e-mail e anexa seu perfil e permissões.
     */
    async obterPorEmail(email) {
        const usuarioRows = await db.ExecutaComando(
            `SELECT u.usu_id as id, u.usu_email as email, u.usu_senha as senha, u.perfil_id, u.pess_id
             FROM tb_usuario u
             JOIN tb_perfil p ON u.perfil_id = p.perf_id
             WHERE u.usu_email = ?`,
            [email]
        );

        if (usuarioRows.length === 0) {
            return null;
        }

        const usuarioData = usuarioRows[0];

        const permissoesRows = await db.ExecutaComando(
            `SELECT p.perm_slug as slug
             FROM tb_permissao p
             JOIN tb_perfil_permissao pp ON p.perm_id = pp.perm_id
             WHERE pp.perf_id = ?`,
            [usuarioData.perfil_id]
        );

        return {
            id: usuarioData.id,
            email: usuarioData.email,
            senha: usuarioData.senha,
            pess_id: usuarioData.pess_id,
            perfil: {
                id: usuarioData.perfil_id,
                // A propriedade 'slug' foi removida pois a coluna não existe na tabela 'tb_perfil'.
            },
            permissoes: permissoesRows
        };
    }

    /**
     * Busca um usuário pelo ID para carregar dados na view.
     */
    async obterPorId(id) {
        const rows = await db.ExecutaComando(
            `SELECT u.usu_id as id, u.usu_email as email, u.perfil_id, u.pess_id,
                    p.pess_nome as pessoa_nome,
                    perf.perf_nome as perfil_nome
             FROM tb_usuario u
             LEFT JOIN tb_pessoa p ON u.pess_id = p.pess_id
             JOIN tb_perfil perf ON u.perfil_id = perf.perf_id
             WHERE u.usu_id = ?`,
            [id]
        );

        if (rows.length > 0) {
            const data = rows[0];
            return { id: data.id, nome: data.pessoa_nome, email: data.email, perfil_id: data.perfil_id, pess_id: data.pess_id };
        }
        return null;
    }

    /**
     * Lista todos os usuários cadastrados.
     */
    async listar() {
        const sql = `SELECT u.usu_id as id, u.usu_email as email, u.perfil_id, u.pess_id,
                            p.pess_nome as pessoa_nome,
                            perf.perf_nome as perfil_nome
                     FROM tb_usuario u
                     LEFT JOIN tb_pessoa p ON u.pess_id = p.pess_id
                     INNER JOIN tb_perfil perf ON u.perfil_id = perf.perf_id
                     ORDER BY p.pess_nome ASC`;
        const rows = await db.ExecutaComando(sql);
        return rows;
    }

    /**
     * Atualiza os dados de um usuário.
     */
    async atualizar(id, email, perfil_id, senha = null) {
        let sql;
        let params;

        if (senha) {
            const senhaHash = await bcrypt.hash(senha, 10);
            sql = `UPDATE tb_usuario SET usu_email = ?, perfil_id = ?, usu_senha = ? WHERE usu_id = ?`;
            params = [email, perfil_id, senhaHash, id];
        } else {
            sql = `UPDATE tb_usuario SET usu_email = ?, perfil_id = ? WHERE usu_id = ?`;
            params = [email, perfil_id, id];
        }

        const result = await db.ExecutaComandoNonQuery(sql, params);
        return result;
    }

    /**
     * Exclui um usuário pelo ID.
     */
    async excluir(id) {
        const sql = `DELETE FROM tb_usuario WHERE usu_id = ?`;
        const result = await db.ExecutaComandoNonQuery(sql, [id]);
        return result;
    }

    /**
     * Cria um novo usuário e a pessoa associada em uma transação.
     */
    async criar(nome, email, senha, telefone, nascimento, perfil_id = 3) {
        // Obtém uma conexão promise-based do pool para controlar a transação
        const connection = await db.conexao.promise().getConnection();
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

            // 3. Inserir na tb_usuario com perfil especificado (default 3) e ativo
            const [usuarioResult] = await connection.execute(
                'INSERT INTO tb_usuario (pess_id, perfil_id, usu_email, usu_senha, usu_ativo) VALUES (?, ?, ?, ?, ?)',
                [pessoaId, perfil_id, email, senhaHash, 1] 
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