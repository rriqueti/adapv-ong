const jwt = require('jsonwebtoken');

class AuthMiddleware {
    
    async auth(req, res, next){
        const token = req.cookies.token;

        if (!token) {
            // Se não houver token, redireciona para o login.
            return res.redirect("/login");
        }

        try {
            // Verifica se o token é válido
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Anexa os dados do usuário (payload do token) ao objeto `req`
            req.usuario = decoded;
            
            next();
        } catch (err) {
            // Se o token for inválido ou expirado, limpa o cookie e redireciona para o login
            res.clearCookie('token');
            return res.redirect("/login");
        }
    }

    /**
     * Middleware de autorização baseada em permissões (slugs).
     * @param {Array} requiredPermissions Lista de permissões necessárias (OR logic).
     */
    authorize(requiredPermissions) {
        return (req, res, next) => {
            const userPermissions = req.usuario.permissoes || [];
            const perfilId = req.usuario.perfilId;

            // Regra Especial: Admin (id 1) sempre tem acesso total
            if (perfilId === 1) {
                return next();
            }
            
            const hasPermission = requiredPermissions.some(p => userPermissions.includes(p));
            
            if (hasPermission) {
                return next();
            } else {
                return res.status(403).render('error', { 
                    message: "Você não tem permissão para acessar esta área." 
                });
            }
        };
    }
}

module.exports = AuthMiddleware;