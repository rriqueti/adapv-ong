const { DateTime } = require("luxon");
const EnderecoModel = require("../models/enderecoModel");
const PessoaModel = require("../models/pessoaModel");

class EnderecoController {

    cadastroView(req, res) {
        res.render('cadastrar/endereco')
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        console.log(req.body)
        if (req.body.cep != "" && req.body.rua != "" && req.body.num != "" && req.body.bairro != "" && req.body.cidade != "" && req.body.estado != "" && req.body.complem != "" && req.body.pess_id != "") {
            let endereco = new EnderecoModel(0, req.body.cep, req.body.rua, req.body.bairro, req.body.num, req.body.cidade, req.body.estado, req.body.complem, req.body.pess_id, dataHoje.toISODate(), dataHoje.toISODate());
            let result = await endereco.cadastrarEndereco();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Endereco cadastrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar o endereco"
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

    async listagemCadView(req, res) {
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa()   
        res.render('cadastrar/endereco', { listaPessoa: listaPessoa})
    }

    async listagemView(req, res) {
        let endereco = new EnderecoModel();
        let listaEndereco = await endereco.listarEndereco()
        res.render('listar/endereco', { listaEndereco: listaEndereco })
    }

    async alterarView(req, res) {
        let endereco = new EnderecoModel();
        endereco = await endereco.obterEndId(req.params.id);
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa()  
        res.render('alterar/endereco', { endereco: endereco, listaPessoa: listaPessoa});
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        console.log(req.body)
        if (req.body.cep != "" && req.body.rua != "" && req.body.num != "" && req.body.bairro != "" && req.body.cidade != "" && req.body.estado != "" && req.body.complem != "" && req.body.pess_id != "") {
            let endereco = new EnderecoModel(req.body.id, req.body.cep, req.body.rua, req.body.bairro, req.body.num, req.body.cidade, req.body.estado, req.body.complem, req.body.pess_id, dataCriacao, dataHoje.toISODate());

            let result = await endereco.editarEndereco();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Endereco alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar endereco!"
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
            let endereco = new EnderecoModel();
            let ok = await endereco.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir endereco" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }

}

module.exports = EnderecoController;