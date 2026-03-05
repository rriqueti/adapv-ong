const { DateTime } = require("luxon");
const PatrimonioModel = require("../models/patrimonioModel");
const DoacoesModel = require("../models/doacoesModel");
const PessoaModel = require("../models/pessoaModel");

class PatrimonioController {

    cadastroView(req, res){
        res.render('cadastrar/patrimonio');
    }

    async cadastrar(req, res){
        const dataHoje = DateTime.now();
        const patrimonio = new PatrimonioModel();
        
        const saldo = await patrimonio.getSaldo() + Number(req.body.valor);

        if (req.body.valor != ""){
            let patrimonio = new PatrimonioModel(0, saldo, req.body.doa_id === '' ? null : req.body.doa_id, dataHoje.toISODate(), dataHoje.toISODate(), req.body.valor);

            let result = await patrimonio.cadastrar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Patrimonio registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar o patrimonio, tente novamente!"
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

    async listagemView(req, res){
        let patrimonio = new PatrimonioModel();
        let listaPatrim = await patrimonio.listar();
        let doacao = new DoacoesModel();
        let listaDoa = await doacao.listaDoacoes();
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa();
        const saldo = await patrimonio.getSaldo();
        console.log(saldo)
        res.render('listar/patrimonio', {listaPatrim: listaPatrim, saldo: saldo, listaDoa: listaDoa, listaPessoa: listaPessoa})
    }

    async listagemDoaCad(req, res){
        let doacao = new DoacoesModel();
        let listaDoa = await doacao.listaDoacoes();
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa();
        res.render('cadastrar/patrimonio', {listaDoa: listaDoa, listaPessoa: listaPessoa})
    }

    async alterarView(req, res){
        let patrimonio = new PatrimonioModel();

        patrimonio = await patrimonio.obterId(req.params.id);

        res.render('alterar/patrimonio', {patrimonio: patrimonio});
    }

    async alterar(req, res){
        const dataHoje = DateTime.now();
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        console.log(req.body)
        let patrimonio = new PatrimonioModel();
        const saldo = await patrimonio.getPenultSaldo(req.body.id) + Number(req.body.valor);
        console.log(saldo)
        if (req.body.valor !== "" || req.body.doa_id !== ""){
            let patrimonio = new PatrimonioModel(req.body.id, saldo, req.body.doa_id === '' ? null : req.body.doa_id, dataCriacao, dataHoje.toISODate(), req.body.valor);

            let result = await patrimonio.editar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Patrimonio alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o patrimonio, tente novamente!"
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
            let patrimonio = new PatrimonioModel();

            let ok = await patrimonio.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir patrimonio" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = PatrimonioController;