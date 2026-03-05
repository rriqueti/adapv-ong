const { DateTime } = require("luxon");
const EventoModel = require("../models/eventosModel");

class EventoController {

    cadastroView(req, res) {
        res.render('cadastrar/eventos');
    }

    async cadastrar(req, res) {

        const dataHoje = DateTime.now();

        if (req.body.nome != "" && req.body.desc != "" && req.body.local != "" && req.body.inicio != "" && req.body.fim != "") {

            let evento = new EventoModel(0, req.body.nome, req.body.desc, req.body.local, req.body.inicio, req.body.fim, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await evento.criarEvento();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Evento registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar o evento, tente novamente."
                });
            }

        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }

    }

    async listagemView(req, res) {
        let evento = new EventoModel();

        let listaEve = await evento.listarEvento();

        res.render('listar/eventos', { listaEve: listaEve })
    }

    async alterarView(req, res) {
        let evento = new EventoModel();

        evento = await evento.ObterEveId(req.params.id);

        res.render('alterar/eventos', { evento: evento });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now();
        const formatDate = (date) => {
            const formattedDate = DateTime.fromJSDate(new Date(Date.parse(date))).toISODate();
            return formattedDate;
        }
        const dataCriacao = formatDate(req.body.createdAt);
        const dataInicio = formatDate(req.body.inicio);
        const dataFinal = formatDate(req.body.fim);

        if (req.body.nome != "" && req.body.desc != "" && req.body.local != "" && req.body.inicio != "" && req.body.fim != "") {
            let evento = new EventoModel(req.body.id, req.body.nome, req.body.desc, req.body.local, dataInicio, dataFinal, dataCriacao, dataHoje.toISODate())

            let result = await evento.editarEvento();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Evento alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o evento, tente novamente"
                });
            }

        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async excluir(req, res) {
        if (req.body.id != null) {

            let evento = new EventoModel();

            let ok = await evento.excluirEvento(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir o projeto!" })
            }

        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = EventoController;