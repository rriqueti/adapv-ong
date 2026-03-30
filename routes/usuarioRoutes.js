const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const ctrl = new UsuarioController();
const auth = new AuthMiddleware();

// Middleware de autorização para todas as rotas de usuários
router.use(auth.authorize(['usuario.cadastrar', 'usuario.alterar', 'usuario.deletar']));

router.get('/listar', ctrl.listagemView);
router.get('/cadastrar', ctrl.cadastroView);
router.post('/cadastrar', ctrl.cadastrar);
router.get('/alterar/:id', ctrl.alterarView);
router.post('/alterar', ctrl.alterar);
router.post('/excluir', ctrl.excluir);

module.exports = router;
