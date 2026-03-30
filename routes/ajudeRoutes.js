const express = require('express');
const AjudeController = require('../controllers/ajudeController');
let ctrl = new AjudeController();

let router = express.Router();

router.get('/', ctrl.ajudeView);
router.post('/doar', ctrl.doar);

module.exports = router;
