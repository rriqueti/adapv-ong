const Database = require('../utils/database');

class PermissaoModel {
    
    // Busca a lista de todas as permissões cadastradas
    async listarPermissoes() {
        const db = new Database();
        const sql = `SELECT perm_id, perm_slug, perm_descricao FROM tb_permissao ORDER BY perm_slug ASC`;
        return await db.ExecutaComando(sql);
    }

    // Busca a relação entre perfis e permissões liberadas
    async listarPerfilPermissoes() {
        const db = new Database();
        const sql = `SELECT perf_id, perm_id FROM tb_perfil_permissao`;
        return await db.ExecutaComando(sql);
    }
}

module.exports = PermissaoModel;