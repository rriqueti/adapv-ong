const Database = require('../utils/database');

/**
 * Classe para interagir com a tabela de menus no banco de dados.
 */
class MenuModel {

    #db;

    constructor() {
        this.#db = new Database();
    }

    /**
     * Lista todos os itens de menu ordenados por categoria e nome.
     * @returns {Promise<Array>} Uma lista de objetos de menu.
     */
    async listarMenus() {
        const sql = "SELECT * FROM tb_menu ORDER BY menu_categoria, menu_nome_tela";
        const menus = await this.#db.ExecutaComando(sql);
        return menus;
    }

    /**
     * Lista os itens de menu associados a um perfil específico.
     * @param {number} perfilId O ID do perfil.
     * @returns {Promise<Array>} Uma lista de objetos de menu para o perfil.
     */
    async listarMenusPorPerfil(perfilId) {
        // Esta consulta busca os menus com base nas permissões do perfil.
        // Lógica: tb_perfil -> tb_perfil_permissao -> tb_permissao <- tb_menu
        // Assume que `tb_menu` tem uma coluna `perm_id` e que `tb_perfil_permissao`
        // usa as colunas `perf_id` e `perm_id`.
        const sql = `
            SELECT DISTINCT m.* FROM tb_menu m
            INNER JOIN tb_perfil_permissao pp ON m.perm_id = pp.perm_id
            WHERE pp.perf_id = ?
            ORDER BY m.menu_categoria, m.menu_nome_tela`;
        const menus = await this.#db.ExecutaComando(sql, [perfilId]);
        return menus;
    }
}

module.exports = MenuModel;