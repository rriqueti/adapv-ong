const express = require('express');
const AtividadesController = require("../controllers/atividadesController");
const verificarPermissao = require("../middleware/permissaoMiddleware");

let ctrl = new AtividadesController();

let router = express.Router();
router.get('/listar', verificarPermissao('atividades.gerenciar'), ctrl.listagemView)
router.get('/cadastrar', verificarPermissao('atividades.gerenciar'), ctrl.listagemCadView)
router.post('/cadastrar', verificarPermissao('atividades.gerenciar'), ctrl.cadastrar)
router.get('/alterar/:id', verificarPermissao('atividades.gerenciar'), ctrl.listagemAltView)
router.post('/alterar', verificarPermissao('atividades.gerenciar'), ctrl.alterar)
router.post('/excluir', verificarPermissao('atividades.gerenciar'), ctrl.excluir)

module.exports = router;