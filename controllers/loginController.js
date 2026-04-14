const UsuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class LoginController {
    loginView(req, res) {
        if (req.cookies.token) {
            try {
                jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                return res.redirect('/');
            } catch (err) {
                res.clearCookie('token');
            }
        }
        let successMessage = null;
        if (req.query.cadastro === 'sucesso') {
            successMessage = "Cadastro realizado com sucesso! Faça o login para continuar.";
        }
        res.render('login', { layout: false, error: null, success: successMessage });
    }

    async login(req, res) {
        const { email, password } = req.body;
        console.log("[LOGIN] Tentativa com email:", email);
        try {
            if (email && password) {
                const usuarioModel = new UsuarioModel();
                const usuario = await usuarioModel.obterPorEmail(email);
                if (!usuario) {
                    console.log("[LOGIN] Usuário não encontrado.");
                    return res.render('login', { layout: false, error: "Usuário ou senha incorretos.", success: null });
                }
                console.log("[LOGIN] Hash armazenado:", usuario.senha);
                const senhaCorreta = await bcrypt.compare(password, usuario.senha);
                console.log("[LOGIN] Resultado da comparação:", senhaCorreta);
                if (senhaCorreta) {
                    const payload = {
                        usuarioId: usuario.id,
                        perfilId: usuario.perfil.id,
                        pess_id: usuario.pess_id,
                        permissoes: usuario.permissoes.map(p => p.slug)
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 8 * 60 * 60 * 1000
                    });
                    return res.redirect('/');
                } else {
                    console.log("[LOGIN] Senha inválida.");
                }
            }
        } catch (err) {
            console.error("Erro de banco de dados no login:", err);
            return res.status(500).render('login', {
                layout: false,
                error: "Erro ao conectar com o banco de dados. Tente novamente mais tarde."
            });
        }
        return res.render('login', {
            layout: false,
            error: "Usuário ou senha incorretos. Por favor, tente novamente.",
            success: null
        });
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.redirect('/login');
    }
}

// ==================== RECUPERAÇÃO DE SENHA ====================
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("[FORGOT] Email solicitado:", email);
    try {
        const usuarioModel = new UsuarioModel();
        const user = await usuarioModel.obterPorEmail(email);
        if (!user) {
            return res.render('forgot-password', { message: 'E-mail não encontrado.', type: 'danger' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiration = Date.now() + 3600000;
        await usuarioModel.saveResetToken(user.id, token, expiration);
        console.log("[FORGOT] Token salvo para usuário:", user.id);


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // false para porta 587, true para porta 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

        const resetLink = `http://localhost:5000/login/reset-password/${token}`;
        await transporter.sendMail({
            from: '"S.O.S Caramelo" <leopoldo.herman95@ethereal.email>',
            to: email,
            subject: 'Recuperação de Senha - S.O.S Caramelo',
            html: `<h3>Recuperação de Senha</h3><p>Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a><p><small>Este link expira em 1 hora.</small></p>`
        });

        res.render('forgot-password', { message: 'Link de recuperação enviado para o seu e-mail!', type: 'success' });
    } catch (error) {
        console.error("[FORGOT] Erro:", error);
        res.render('forgot-password', { message: 'Erro ao enviar o e-mail. Tente novamente.', type: 'danger' });
    }
};

const resetPassword = async (req, res) => {
    const { token, senha, confirmarSenha } = req.body;
    console.log("[RESET] Token recebido:", token);
    console.log("[RESET] Senha (raw):", senha);
    console.log("[RESET] Confirmar senha:", confirmarSenha);

    if (senha !== confirmarSenha) {
        return res.render('reset-password', { token, message: 'As senhas não coincidem.', type: 'danger' });
    }

    try {
        const usuarioModel = new UsuarioModel();
        const user = await usuarioModel.findByResetToken(token);
        if (!user || user.reset_token_expiration < Date.now()) {
            console.log("[RESET] Token inválido ou expirado.");
            return res.render('reset-password', { token, message: 'Token inválido ou expirado.', type: 'danger' });
        }
        console.log("[RESET] Usuário encontrado - ID:", user.id, "Email:", user.email);

        const hashedPassword = await bcrypt.hash(senha, 10);
        console.log("[RESET] Hash gerado:", hashedPassword);

        // Atualiza a senha no banco
        await usuarioModel.updatePassword(user.id, hashedPassword);
        console.log("[RESET] updatePassword executado.");

        // 🔍 Verificação: recarrega o usuário pelo email e testa a senha
        const usuarioAtualizado = await usuarioModel.obterPorEmail(user.email);
        if (!usuarioAtualizado) {
            console.error("[RESET] Não foi possível encontrar o usuário após update.");
            return res.render('reset-password', { token, message: 'Erro ao verificar a nova senha.', type: 'danger' });
        }
        const hashSalvo = usuarioAtualizado.senha;
        console.log("[RESET] Hash salvo no banco após update:", hashSalvo);

        const testeCompare = await bcrypt.compare(senha, hashSalvo);
        console.log("[RESET] Teste de comparação (mesma senha):", testeCompare);

        if (!testeCompare) {
            console.error("[RESET] CRÍTICO: O hash salvo não corresponde à senha!");
            return res.render('reset-password', { token, message: 'Erro interno: a senha não foi salva corretamente. Tente novamente.', type: 'danger' });
        }

        await usuarioModel.clearResetToken(user.id);
        console.log("[RESET] Token limpo. Redirecionando para login.");
        res.redirect('/login?message=Senha alterada com sucesso! Faça login novamente.');
    } catch (error) {
        console.error("[RESET] Erro:", error);
        res.render('reset-password', { token, message: 'Erro ao redefinir senha.', type: 'danger' });
    }
};

module.exports = {
    LoginController,
    forgotPassword,
    resetPassword
};