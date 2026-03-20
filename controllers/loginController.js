const UsuarioModel = require('../models/usuarioModel'); // Novo Model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LoginController {

    loginView(req, res) {
        // Se o usuário já estiver logado (tiver um token válido), redireciona para a home
        if (req.cookies.token) {
            try {
                // Verifica se o token não é inválido/expirado
                jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                return res.redirect('/');
            } catch (err) {
                // Se o token for inválido, limpa o cookie e mostra a página de login
                res.clearCookie('token');
            }
        }
        // Renderiza a nova página de login sem o layout principal
        res.render('login', { layout: false, error: null });
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            if (email && password) {
                const usuarioModel = new UsuarioModel();
                const usuario = await usuarioModel.obterPorEmail(email);

                if (usuario && await bcrypt.compare(password, usuario.senha)) {
                    // Payload do token com informações essenciais
                    const payload = {
                        usuarioId: usuario.id,
                        perfil: usuario.perfil.slug,
                        permissoes: usuario.permissoes.map(p => p.slug) // Array de slugs de permissão
                    };

                    // Gerar o token JWT
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

                    // Define o token em um cookie HttpOnly seguro e redireciona
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 8 * 60 * 60 * 1000 // 8 horas
                    });

                    return res.redirect('/');
                }
            }
        } catch (err) {
            console.error("Erro de banco de dados no login:", err);
            return res.status(500).render('login', {
                layout: false,
                error: "Erro ao conectar com o banco de dados. Tente novamente mais tarde."
            });
        }

        // Falha na autenticação
        return res.render('login', {
            layout: false,
            error: "Usuário ou senha incorretos. Por favor, tente novamente."
        });
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.redirect('/login');
    }
}

module.exports = LoginController;