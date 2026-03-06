const MenuModel = require('../models/menuModel');

/**
 * Middleware para carregar os itens de menu do banco de dados
 * e disponibilizá-los para as views.
 */
async function loadMenu(req, res, next) {
    // Evita carregar o menu para a página de login ou para requisições AJAX
    if (req.path.startsWith('/login') || req.xhr) {
        return next();
    }

    try {
        const menuModel = new MenuModel();
        const menus = await menuModel.listarMenus();

        // Agrupa os menus por categoria para facilitar a renderização na view
        const menuCategorias = menus.reduce((acc, item) => {
            const categoria = item.menu_categoria;
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            acc[categoria].push(item);
            return acc;
        }, {});

        // Disponibiliza os menus agrupados para todas as views através do res.locals
        res.locals.menuCategorias = menuCategorias;
        next();
    } catch (error) {
        console.error("Erro ao carregar o menu da sidebar:", error);
        // Em caso de erro, continua a requisição sem os dados do menu
        res.locals.menuCategorias = {};
        next();
    }
}

module.exports = loadMenu;