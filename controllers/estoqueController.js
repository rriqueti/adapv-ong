const { DateTime } = require("luxon");
const EstoqueModel = require("../models/estoqueModel");
const DoacaoModel = require("../models/doacoesModel");
const ProdutosModel = require("../models/produtosModel");

class EstoqueController {

    cadastroView(req, res) {
        res.render('cadastrar/estoque');
    }

    async listagemView(req, res) {
        let estoque = new EstoqueModel();
        let listaEstoq = await estoque.listar();
        res.render('listar/estoque', { listaEstoq: listaEstoq })
    }

    async listagemDoaCad(req, res) {
        let doacao = new DoacaoModel();
        let listaDoa = await doacao.listaDoacoes();
        let produto = new ProdutosModel();
        let listaPro = await produto.listar();
        res.render('cadastrar/estoque', { listaDoa: listaDoa, listaPro: listaPro })
    }

    async alterarView(req, res) {
        let estoque = new EstoqueModel();

        estoque = await estoque.obterId(req.params.id);

        res.render('alterar/estoque', { estoque: estoque });
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();

        if (req.body.prod_id != "" && req.body.doa_id != "") {

            let estoque = new EstoqueModel(0, req.body.prod_id, req.body.doa_id, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await estoque.cadastrar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Estoque registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar o estoque, tente novamente!"
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

    async alterar(req, res) {
        const dataHoje = DateTime.now();
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        console.log(req.body)

        if (req.body.prod_id != "" && req.body.doa_id != "0") {
            let estoque = new EstoqueModel(req.body.id, req.body.prod_id, req.body.doa_id, dataCriacao, dataHoje.toISODate());

            let result = await estoque.editar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Estoque alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o estoque, tente novamente!"
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
            let estoque = new EstoqueModel();

            let ok = await estoque.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir estoque" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = EstoqueController;