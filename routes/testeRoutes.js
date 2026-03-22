const express = require('express');
const router = express.Router();
const TesteController = require('../controllers/testeController');

const testeController = new TesteController();

router.get('/perfis', testeController.listarPerfis);

module.exports = router;