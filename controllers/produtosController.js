const { DateTime } = require("luxon");
const ProdutosModel = require("../models/produtosModel");
const EstoqueModel = require("../models/estoqueModel");

class ProdutosController {

    cadastroView(req, res) {
        res.render('cadastrar/produtos');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        if (req.body.nome != "" && req.body.tipo != "" && req.body.desc != "" && req.body.qnt != "") {
           let produtos = new ProdutosModel(0, req.body.nome, req.body.tipo, req.body.desc, req.body.qnt, dataHoje.toISODate(), dataHoje.toISODate(), req.body.situa === '' ? null : req.body.situa,
        req.body.valor === '' ? null : req.body.valor, req.body.prod_marca, req.body.prod_validade);

            let result = await produtos.cadastrar();

           if (result) {

            let listaProdutos = await new ProdutosModel().listar();
            let ultimoProduto = listaProdutos[listaProdutos.length - 1];

            let estoque = new EstoqueModel(
                0,
                ultimoProduto.prod_id,
                null,
                dataHoje.toISODate(),
                dataHoje.toISODate()
            );

            await estoque.cadastrar();

            res.send({
                ok: true,
                msg: "Produto registrado e enviado ao estoque!"
            });

        } else {

            res.send({
                ok: false,
                msg: "Erro ao registrar produto!"
            });

        }

    } else {

        res.send({
            ok: false,
            msg: "Preencha os campos obrigatórios!"
        });

    }
}

    async listagemView(req, res) {
        let produto = new ProdutosModel()
        let listaProd = await produto.listar();
        res.render('listar/produtos', { listaProd: listaProd });
    }

    async alterarView(req, res) {
        let produto = new ProdutosModel();
        produto = await produto.obterId(req.params.id);
        res.render('alterar/produtos', { produto: produto});
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        if (req.body.nome != "" && req.body.tipo != "" && req.body.desc != "" && req.body.qnt != "") {
            let produto = new ProdutosModel(req.body.id, req.body.nome, req.body.tipo, req.body.desc, req.body.qnt, dataCriacao, dataHoje.toISODate());

            let result = await produto.editar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Produto alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o produto, tente novamente!"
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
            let produto = new ProdutosModel();

            let ok = await produto.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir produto" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = ProdutosController;