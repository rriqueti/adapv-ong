const Database = require('../utils/database');

class PerfilModel {
    
    async listarPerfis() {
        const db = new Database();
        const sql = `SELECT perf_id, perf_nome, perf_descricao, createdAt, updatedAt 
                     FROM tb_perfil 
                     ORDER BY perf_id ASC`;
        const perfis = await db.ExecutaComando(sql);
        return perfis;
    }

    async cadastrar(nome, descricao) {
        const db = new Database();
        const sql = `INSERT INTO tb_perfil (perf_nome, perf_descricao, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`;
        const result = await db.ExecutaComandoNonQuery(sql, [nome, descricao]);
        return result;
    }

    async obterPorId(id) {
        const db = new Database();
        const sql = `SELECT * FROM tb_perfil WHERE perf_id = ?`;
        const rows = await db.ExecutaComando(sql, [id]);
        return rows[0];
    }
}

module.exports = PerfilModel;