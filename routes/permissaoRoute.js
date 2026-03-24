const express = require('express');
const PermissaoController = require('../controllers/permissaoController');

let ctrl = new PermissaoController();

let router = express.Router();

router.get('/', ctrl.indexView);

module.exports = router;
