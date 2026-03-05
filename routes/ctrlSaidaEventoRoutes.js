const express = require('express');
const CtrlSaidaEventoController = require('../controllers/ctrlSaidaEventoController');

let ctrl = new CtrlSaidaEventoController()

let router = express.Router();

router.get('/listar', ctrl.listagemView) 
router.get('/cadastrar', ctrl.listagemCadView, ctrl.cadastroView)
router.get('/cadastrar/:id', ctrl.listagemCadEntradaView, ctrl.cadastrarEntradaView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.listagemAltView, ctrl.alterarView)
router.post('/alterar', ctrl.alterar) 
router.post('/excluir', ctrl.excluir) 

module.exports = router;