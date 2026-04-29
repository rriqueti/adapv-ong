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

        // Injeta manualmente a categoria "Acessos" e seus links se não existirem
        // SOMENTE se o usuário tiver as permissões necessárias
        const permissoesUsuario = res.locals.permissoes || [];
        const temPermissaoAcesso = permissoesUsuario.some(p => 
            ['usuario.cadastrar', 'usuario.alterar', 'usuario.deletar'].includes(p)
        );

        if (temPermissaoAcesso) {
            if (!res.locals.menuCategorias["Acessos"]) {
                res.locals.menuCategorias["Acessos"] = [];
            }
            
            const linksAcessos = [
                { nome: "Usuários", url: "/usuarios/listar" },
                { nome: "Voluntários", url: "/voluntarios/listar" },
                { nome: "Empresas", url: "/empresas/listar" }
            ];

            linksAcessos.forEach(link => {
                if (!res.locals.menuCategorias["Acessos"].some(item => item.menu_url === link.url)) {
                    res.locals.menuCategorias["Acessos"].push({
                        menu_nome_tela: link.nome,
                        menu_url: link.url
                    });
                }
            });
        }

        // Injeta a categoria "Doações" para o Financeiro
        const temPermissaoFinanceiro = permissoesUsuario.some(p => 
            ['financeiro.cadastrar', 'financeiro.listar', 'financeiro.editar', 'financeiro.excluir'].includes(p)
        );

        if (temPermissaoFinanceiro) {
            if (!res.locals.menuCategorias["Doações"]) {
                res.locals.menuCategorias["Doações"] = [];
            }
            
            const linksDoacoes = [
                { nome: "Financeiro", url: "/financeiro/listar" }
            ];

            linksDoacoes.forEach(link => {
                if (!res.locals.menuCategorias["Doações"].some(item => item.menu_url === link.url)) {
                    res.locals.menuCategorias["Doações"].push({
                        menu_nome_tela: link.nome,
                        menu_url: link.url
                    });
                }
            });
        }

        // Injeta a categoria "Projetos"
        const temPermissaoProjetos = permissoesUsuario.includes('projetos.gerenciar') || usuario.perfil_id === 1;

        if (temPermissaoProjetos) {
            if (!res.locals.menuCategorias["Projetos"]) {
                res.locals.menuCategorias["Projetos"] = [];
            }
            
            const linksProjetos = [
                { nome: "Gestão de Projetos", url: "/projeto/listar" },
                { nome: "Gestão de Atividades", url: "/atividades/listar" }
            ];

            linksProjetos.forEach(link => {
                if (!res.locals.menuCategorias["Projetos"].some(item => item.menu_url === link.url)) {
                    res.locals.menuCategorias["Projetos"].push({
                        menu_nome_tela: link.nome,
                        menu_url: link.url
                    });
                }
            });
        }

    } catch (error) {
        console.error("Erro ao carregar dados para a view:", error);
        res.locals.usuarioLogado = null;
        res.locals.menuCategorias = {};
    }

    next();
}

module.exports = loadGlobalData;