/**
 * Middleware para verificar se o usuário logado possui uma permissão específica.
 * @param {string} permissaoRequerida - A permissão necessária (ex: 'permissoes.gerenciar')
 */
function verificarPermissao(permissaoRequerida) {
    return (req, res, next) => {
        // As permissões são carregadas no token/menuMiddleware e ficam em res.locals.permissoes
        const permissoes = res.locals.permissoes || [];
        
        if (permissoes.includes(permissaoRequerida)) {
            return next();
        }
        
        return res.status(403).send("<h1>403 - Acesso Negado</h1><p>Você não tem permissão para acessar este recurso.</p><a href='/'>Voltar para a Home</a>");
    };
}

module.exports = verificarPermissao;