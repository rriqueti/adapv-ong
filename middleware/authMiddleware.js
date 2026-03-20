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
}

module.exports = AuthMiddleware;