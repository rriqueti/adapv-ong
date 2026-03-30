const express = require('express');
const PermissaoController = require('../controllers/permissaoController');

let ctrl = new PermissaoController();

let router = express.Router();

router.get('/', ctrl.indexView);
router.post('/salvar', ctrl.salvar);
router.get('/perfil/cadastrar', ctrl.cadastrarPerfilView);
router.post('/perfil/cadastrar', ctrl.cadastrarPerfil);

module.exports = router;
