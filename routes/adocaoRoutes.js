const express = require('express');
const AdocaoController = require("../controllers/adocaoController");

let ctrl = new AdocaoController();

let router = express.Router();

router.get('/listar', ctrl.listagemView) 
router.get('/cadastrar', ctrl.listagemPessoaCadView, ctrl.cadastroView) 
router.post('/cadastrar', ctrl.cadastrar) 
router.get('/alterar/:id', ctrl.listagemAltView, ctrl.alterarView)
router.post('/alterar', ctrl.alterar) 
router.post('/excluir', ctrl.excluir) 

module.exports = router;