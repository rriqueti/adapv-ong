const { DateTime } = require("luxon");
const PessoaModel = require("../models/pessoaModel");

class PessoaController {

    cadastroView(req, res) {
        res.render('cadastrar/pessoa')
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        console.log(req.body)
        if (req.body.nome != "" && req.body.cpf != "" && req.body.rg != "" && req.body.nasc != "" && req.body.nacio != "" && req.body.gene != "" && req.body.tel != "" && req.body.tipo != "") {
            let pessoa = new PessoaModel(0, req.body.nome, req.body.cpf, req.body.rg, req.body.nasc, req.body.nacio, req.body.gene, req.body.tel, req.body.tipo, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await pessoa.cadastrarPessoa();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Pessoa cadastrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar a pessoa"
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
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        res.render('listar/pessoa', { lista: listaPessoas })
    }

    async alterarView(req, res) {
        let pessoa = new PessoaModel();
        pessoa = await pessoa.obterPessId(req.params.id);
        res.render('alterar/pessoa', { pessoa: pessoa });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        console.log(req.body)
        if (req.body.nome != "" && req.body.cpf != "" && req.body.rg != "" && req.body.nasc != "" && req.body.nacio != "" && req.body.genero != "" && req.body.tel != "" && req.body.tipo != "") {
            let pessoa = new PessoaModel(req.body.id, req.body.nome, req.body.cpf, req.body.rg, req.body.nasc, req.body.nacio, req.body.genero, req.body.tel, req.body.tipo, dataCriacao, dataHoje.toISODate());

            let result = await pessoa.editarPessoa();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Pessoa alterada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar pessoa!"
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
            let pessoa = new PessoaModel();
            let ok = await pessoa.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir pessoa" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }

}

module.exports = PessoaController;