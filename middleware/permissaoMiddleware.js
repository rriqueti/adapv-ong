/**
 * Middleware para verificar se o usuário logado possui uma permissão específica.
 * @param {string} permissaoRequerida - A permissão necessária (ex: 'permissoes.gerenciar')
 */
function verificarPermissao(permissaoRequerida) {
    return (req, res, next) => {
        // Obter perfil e permissões do usuário logado (setados no token)
        // Se estiver no res.locals (do menuMiddleware) ou no req.usuario (do authMiddleware)
        const perfilId = res.locals.usuarioLogado?.perfil_id || req.usuario?.perfilId;
        const permissoes = res.locals.permissoes || req.usuario?.permissoes || [];
        
        // Regra Especial: Admin (id 1) sempre tem acesso total
        if (perfilId === 1) {
            return next();
        }

        if (permissoes.includes(permissaoRequerida)) {
            return next();
        }
        
        return res.status(403).send("<h1>403 - Acesso Negado</h1><p>Você não tem permissão para acessar este recurso.</p><a href='/'>Voltar para a Home</a>");
    };
}

module.exports = verificarPermissao;