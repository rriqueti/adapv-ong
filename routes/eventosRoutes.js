const express = require('express');
const EventoController = require("../controllers/eventosController");
const { route } = require('./pessoaRoutes');

let ctrl = new EventoController();

let router = express.Router();

router.get('/listar', ctrl.listagemView);
router.get('/cadastrar', ctrl.cadastroView);
router.post('/cadastrar', ctrl.cadastrar);
router.get('/alterar/:id', ctrl.alterarView);
router.post('/alterar', ctrl.alterar);
router.post('/excluir', ctrl.excluir);

module.exports = router;