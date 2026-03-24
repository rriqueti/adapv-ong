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
}

module.exports = PerfilModel;