const { DateTime } = require("luxon");

const AgendamentoModel = require("../models/agendamentoModel");
const ProdutosModel = require("../models/produtosModel");

class AgendamentoController {

    async cadastroView(req, res) {

        let produto = new ProdutosModel();

        let listaTipos = await produto.listarTipos();

        res.render("cadastrar/agendamentoDoacao", {
            listaTipos
        });
    }

    async cadastrar(req, res) {

        const dataHoje = DateTime.now();

        if (

            req.body.doador_nome != "" &&
            req.body.produto_nome != "" &&
            req.body.produto_tipo != "" &&
            req.body.quantidade != "" &&
            req.body.produto_marca != "" &&
            req.body.produto_validade != "" &&
            req.body.data_doacao != "" &&
            req.body.hora_doacao != "" &&
            req.body.endereco != ""

        ) {

            let agendamento = new AgendamentoModel(

                0,

                req.body.doador_nome,

                req.body.produto_nome,
                req.body.produto_tipo,
                req.body.quantidade,
                req.body.produto_validade,
                req.body.produto_marca,

                req.body.data_doacao,
                req.body.hora_doacao,

                req.body.endereco,

                "Pendente",

                dataHoje.toISO(),
                dataHoje.toISO()
            );

            let result = await agendamento.cadastrar();

            if (result) {

                res.send({
                    ok: true,
                    msg: "Agendamento realizado com sucesso!"
                });

            }
            else {

                res.send({
                    ok: false,
                    msg: "Erro ao realizar agendamento"
                });

            }

        }
        else {

            res.send({
                ok: false,
                msg: "Preencha todos os campos"
            });

        }

    }

    async listagemView(req, res) {

        let agendamento = new AgendamentoModel();

        let lista = await agendamento.listar();

        res.render("listar/agendamento", {
            lista
        });
    }

    async concluir(req, res) {

    let agendamento = new AgendamentoModel();

    await agendamento.concluir(req.params.id);

    res.redirect("/agendamento/listar");
}

async cancelar(req, res) {

    let agendamento = new AgendamentoModel();

    await agendamento.cancelar(req.params.id);

    res.redirect("/agendamento/listar");
}
}

module.exports = AgendamentoController;