const express = require('express');
const ProjetosController = require("../controllers/projetosController");
const upload = require("../middleware/projectUploadMiddleware");
const verificarPermissao = require("../middleware/permissaoMiddleware");

let ctrl = new ProjetosController();

let router = express.Router();

router.get('/listar', verificarPermissao('projetos.gerenciar'), ctrl.listagemView);
router.get('/cadastrar', verificarPermissao('projetos.gerenciar'), ctrl.listagemAtivCad, ctrl.cadastroView)
router.post('/cadastrar', verificarPermissao('projetos.gerenciar'), upload.single('banner'), ctrl.cadastrar);
router.get('/alterar/:id', verificarPermissao('projetos.gerenciar'), ctrl.alterarView)
router.post('/alterar', verificarPermissao('projetos.gerenciar'), upload.single('banner'), ctrl.alterar) 
router.post('/excluir', verificarPermissao('projetos.gerenciar'), ctrl.excluir) 

module.exports = router;
