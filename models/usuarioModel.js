const bcrypt = require('bcryptjs');
const Database = require('../utils/database');

class UsuarioModel {
    constructor() {
        this.db = new Database(); // já existe, mas garanta que a classe Database funcione
    }

    // ==================== MÉTODOS EXISTENTES (ajustados) ====================
    async obterPorEmail(email) {
        const usuarioRows = await this.db.ExecutaComando(
            `SELECT u.usu_id as id, u.usu_email as email, u.usu_senha as senha, u.perfil_id, u.pess_id
             FROM tb_usuario u
             JOIN tb_perfil p ON u.perfil_id = p.perf_id
             WHERE u.usu_email = ?`,
            [email]
        );

        if (usuarioRows.length === 0) return null;

        const usuarioData = usuarioRows[0];
        const permissoesRows = await this.db.ExecutaComando(
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
            perfil: { id: usuarioData.perfil_id },
            permissoes: permissoesRows
        };
    }

    async obterPorId(id) {
        const rows = await this.db.ExecutaComando(
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
            return { 
                id: data.id, 
                nome: data.pessoa_nome, 
                email: data.email, 
                perfil_id: data.perfil_id, 
                pess_id: data.pess_id, 
                perfil_nome: data.perfil_nome 
            };
        }
        return null;
    }

    async listar() {
        const sql = `SELECT u.usu_id as id, u.usu_email as email, u.perfil_id, u.pess_id,
                            p.pess_nome as pessoa_nome,
                            perf.perf_nome as perfil_nome
                     FROM tb_usuario u
                     LEFT JOIN tb_pessoa p ON u.pess_id = p.pess_id
                     INNER JOIN tb_perfil perf ON u.perfil_id = perf.perf_id
                     ORDER BY p.pess_nome ASC`;
        const rows = await this.db.ExecutaComando(sql);
        return rows;
    }

    async atualizar(id, email, perfil_id, senha = null) {
        let sql, params;
        if (senha) {
            const senhaHash = await bcrypt.hash(senha, 10);
            sql = `UPDATE tb_usuario SET usu_email = ?, perfil_id = ?, usu_senha = ? WHERE usu_id = ?`;
            params = [email, perfil_id, senhaHash, id];
        } else {
            sql = `UPDATE tb_usuario SET usu_email = ?, perfil_id = ? WHERE usu_id = ?`;
            params = [email, perfil_id, id];
        }
        const result = await this.db.ExecutaComandoNonQuery(sql, params);
        return result;
    }

    async excluir(id) {
        const sql = `DELETE FROM tb_usuario WHERE usu_id = ?`;
        const result = await this.db.ExecutaComandoNonQuery(sql, [id]);
        return result;
    }

    async criar(nome, email, senha, telefone, nascimento, perfil_id = 3) {
        const connection = await this.db.conexao.promise().getConnection();
        try {
            const usuarioExistente = await this.obterPorEmail(email);
            if (usuarioExistente) {
                const error = new Error('E-mail já cadastrado.');
                error.code = 'ER_DUP_ENTRY';
                throw error;
            }
            await connection.beginTransaction();
            const [pessoaResult] = await connection.execute(
                'INSERT INTO tb_pessoa (pess_nome, pess_tipo, pess_tel, pess_nasc) VALUES (?, ?, ?, ?)',
                [nome, 'Adotante', telefone, nascimento]
            );
            const pessoaId = pessoaResult.insertId;
            const senhaHash = await bcrypt.hash(senha, 10);
            const [usuarioResult] = await connection.execute(
                'INSERT INTO tb_usuario (pess_id, perfil_id, usu_email, usu_senha, usu_ativo) VALUES (?, ?, ?, ?, ?)',
                [pessoaId, perfil_id, email, senhaHash, 1]
            );
            await connection.commit();
            return { success: true, userId: usuarioResult.insertId };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // ==================== MÉTODOS PARA RECUPERAÇÃO DE SENHA ====================
    async saveResetToken(userId, token, expiration) {
        const sql = `UPDATE tb_usuario SET reset_token = ?, reset_token_expiration = ? WHERE usu_id = ?`;
        await this.db.ExecutaComandoNonQuery(sql, [token, expiration, userId]);
    }

    async findByResetToken(token) {
    const sql = `SELECT usu_id as id, usu_email as email, reset_token_expiration 
                 FROM tb_usuario 
                 WHERE reset_token = ? AND reset_token_expiration > ?`;
    const rows = await this.db.ExecutaComando(sql, [token, Date.now()]);
    return rows.length ? rows[0] : null;
} 

    async updatePassword(userId, hashedPassword) {
    const sql = `UPDATE tb_usuario SET usu_senha = ? WHERE usu_id = ?`;
    const result = await this.db.ExecutaComandoNonQuery(sql, [hashedPassword, userId]);
    console.log("[updatePassword] Linhas afetadas:", result); // para debug
    return result;
}

    async clearResetToken(userId) {
        const sql = `UPDATE tb_usuario SET reset_token = NULL, reset_token_expiration = NULL WHERE usu_id = ?`;
        await this.db.ExecutaComandoNonQuery(sql, [userId]);
    }
}

module.exports = UsuarioModel;