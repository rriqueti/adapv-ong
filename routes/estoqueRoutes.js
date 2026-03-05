const express = require('express');
const EstoqueController = require("../controllers/estoqueController");


let ctrl = new EstoqueController();

let router = express.Router();

router.get('/listar', ctrl.listagemView);
router.get('/cadastrar', ctrl.listagemDoaCad, ctrl.cadastroView);
router.post('/cadastrar', ctrl.cadastrar);
router.get('/alterar/:id', ctrl.alterarView);
router.post('/alterar', ctrl.alterar);
router.post("/excluir", ctrl.excluir);

module.exports = router;