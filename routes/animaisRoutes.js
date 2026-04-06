const express = require('express');
const AnimaisController = require("../controllers/animaisController");
const upload = require('../middleware/uploadMiddleware');

let ctrl = new AnimaisController();
let router = express.Router();

router.get('/listar', ctrl.listagemView.bind(ctrl));
router.get('/cadastrar', ctrl.cadastroView.bind(ctrl));
router.post('/cadastrar', upload.array('fotos', 10), ctrl.cadastrar.bind(ctrl));
router.get('/alterar/:id', ctrl.alterarView.bind(ctrl));
router.post('/alterar', upload.array('fotos', 10), ctrl.alterar.bind(ctrl));
router.post('/excluir', ctrl.excluir.bind(ctrl));
router.post('/foto/excluir', ctrl.excluirFoto.bind(ctrl));
router.post('/foto/perfil', ctrl.definirFotoPerfil.bind(ctrl));

module.exports = router;