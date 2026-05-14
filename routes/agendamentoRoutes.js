const express = require("express");

const router = express.Router();

const AgendamentoController = require("../controllers/agendamentoController");

let ctrl = new AgendamentoController();

router.get("/cadastrar", (req, res) => {
    ctrl.cadastroView(req, res);
});

router.post("/cadastrar", (req, res) => {
    ctrl.cadastrar(req, res);
});

router.get("/listar", (req, res) => {
    ctrl.listagemView(req, res);
});

router.get("/concluir/:id", (req, res) => {
    ctrl.concluir(req, res);
});

router.get("/cancelar/:id", (req, res) => {
    ctrl.cancelar(req, res);
});

module.exports = router;