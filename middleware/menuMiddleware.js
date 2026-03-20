const MenuModel = require('../models/menuModel');
const UsuarioModel = require('../models/usuarioModel'); // Usar o novo model
const jwt = require('jsonwebtoken');

/**
 * Middleware para carregar dados globais (menu, usuário) para as views.
 */
async function loadGlobalData(req, res, next) {
    // O token JWT agora é validado pelo `isAuthenticated`.
    // Este middleware agora foca em popular `res.locals` para as views.
    
    // Extrai o token do cookie (se o frontend o armazenar lá) ou do header
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.substring(7) : null);

    if (req.path.startsWith('/login') || !token) {
        res.locals.usuarioLogado = null;
        res.locals.menuCategorias = {};
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuarioModel = new UsuarioModel();
        // Busca os dados completos do usuário para a view (nome, etc.)
        const usuario = await usuarioModel.obterPorId(decoded.usuarioId);
        
        res.locals.usuarioLogado = usuario; // Contém nome, email, perfil, etc.
        res.locals.permissoes = decoded.permissoes; // Passa as permissões para as views

        // Carrega os itens de menu com base no perfil do usuário
        const menuModel = new MenuModel();
        const menus = await menuModel.listarMenusPorPerfil(usuario.perfil_id);

        // Agrupa os menus por categoria (lógica existente mantida)
        res.locals.menuCategorias = menus.reduce((acc, item) => {
            const categoria = item.menu_categoria;
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            acc[categoria].push(item);
            return acc;
        }, {});

    } catch (error) {
        console.error("Erro ao carregar dados para a view:", error);
        res.locals.usuarioLogado = null;
        res.locals.menuCategorias = {};
    }

    next();
}

module.exports = loadGlobalData;