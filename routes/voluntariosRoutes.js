const express = require('express');
const VoluntariosController = require("../controllers/voluntariosController");
const AuthMiddleware = require("../middleware/authMiddleware");

let ctrl = new VoluntariosController();
let auth = new AuthMiddleware();

let router = express.Router();

// Middleware de autorização para todas as rotas de voluntários
router.use(auth.authorize(['usuario.cadastrar', 'usuario.alterar', 'usuario.deletar']));

router.get('/listar', ctrl.listagemView) 
router.get('/cadastrar', ctrl.listagemVolunCadView, ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.alterarView)
router.post('/alterar', ctrl.alterar) 
router.post('/excluir', ctrl.excluir) 

module.exports = router;