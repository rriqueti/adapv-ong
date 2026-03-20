const express = require('express');
const LoginController = require('../controllers/loginController');
let ctrl = new LoginController();

let router = express.Router();

router.get('/', ctrl.loginView);
router.post('/', ctrl.login);
router.get('/logout', ctrl.logout);

module.exports = router;