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
}

module.exports = MenuModel;