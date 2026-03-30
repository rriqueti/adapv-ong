const express = require('express');
const FinanceiroController = require('../controllers/financeiroController');
const AuthMiddleware = require('../middleware/authMiddleware');

let ctrl = new FinanceiroController();
let auth = new AuthMiddleware();

let router = express.Router();

router.get('/listar', auth.authorize(['financeiro.listar']), ctrl.listagemView);
router.get('/cadastrar', auth.authorize(['financeiro.cadastrar']), ctrl.cadastroView);
router.post('/cadastrar', auth.authorize(['financeiro.cadastrar']), ctrl.cadastrar);

module.exports = router;
