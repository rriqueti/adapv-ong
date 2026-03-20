const express = require('express');
const router = express.Router();
const CadastroController = require('../controllers/cadastroController');

const cadastroController = new CadastroController();

router.get('/', cadastroController.cadastroView);
router.post('/', cadastroController.cadastrar.bind(cadastroController));

module.exports = router;