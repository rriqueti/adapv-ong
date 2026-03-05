const express = require('express');
const AtividadesController = require("../controllers/atividadesController");

let ctrl = new AtividadesController();

let router = express.Router();
router.get('/listar', ctrl.listagemView)
router.get('/cadastrar', ctrl.listagemCadView, ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.listagemAltView, ctrl.alterarView)
router.post('/alterar', ctrl.alterar)
router.post('/excluir', ctrl.excluir)

module.exports = router;