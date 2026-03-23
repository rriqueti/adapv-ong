const Database = require('../utils/database');

const db = new Database();

// Classe de banco de dados para a consulta de teste.
class PerfilModel {
    async listarTodos() {
        return await db.ExecutaComando("SELECT * FROM tb_perfil ORDER BY perf_nome");
    }
}

module.exports = PerfilModel;