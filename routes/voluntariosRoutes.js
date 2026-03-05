const express = require('express');
const VoluntariosController = require("../controllers/voluntariosController");

let ctrl = new VoluntariosController();

let router = express.Router();

router.get('/listar', ctrl.listagemView) 
router.get('/cadastrar', ctrl.listagemVolunCadView, ctrl.cadastroView)
router.post('/cadastrar', ctrl.cadastrar)
router.get('/alterar/:id', ctrl.alterarView)
router.post('/alterar', ctrl.alterar) 
router.post('/excluir', ctrl.excluir) 

module.exports = router;