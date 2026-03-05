const express = require('express');
const EmpresasController = require("../controllers/empresasController");

let ctrl = new EmpresasController();

let router = express.Router();

router.get('/listar', ctrl.listagemView)
router.get('/cadastrar', ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.alterarView)
router.post('/alterar', ctrl.alterar)
router.post('/excluir', ctrl.excluir)

module.exports = router;