const express = require('express');
const { LoginController, forgotPassword, resetPassword } = require('../controllers/loginController');

let ctrl = new LoginController();
let router = express.Router();

router.get('/', ctrl.loginView);
router.post('/', ctrl.login);
router.get('/logout', ctrl.logout);

// Página de "Esqueceu a senha?"
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

// Recebe o e-mail e envia o link de recuperação
router.post('/forgot-password', forgotPassword);   // ← agora usa a função importada

// Página para redefinir a senha (com token)
router.get('/reset-password/:token', (req, res) => {
    res.render('reset-password', { token: req.params.token });
});

// Recebe a nova senha e atualiza
router.post('/reset-password', resetPassword);     // ← agora usa a função importada

module.exports = router;