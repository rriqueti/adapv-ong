const { DateTime } = require("luxon");
const PessoaModel = require("../models/pessoaModel");
const AdminModel = require("../models/adminModel");

class AdminController {

    cadastroView(req, res) {
        res.render('cadastrar/admin');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        if (req.body.pess_id != '' && req.body.email != '' && req.body.senha != '') {
            let admin = new AdminModel(0, req.body.pess_id, req.body.email, req.body.senha, dataHoje.toISODate(), dataHoje.toISODate(), 1);

            let result = await admin.cadastrar();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Admin cadastrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar a Admin, tente novamente!"
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

    async listagemVolunCadView(req, res) {
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        res.render('cadastrar/admin', { listaPessoa: listaPessoas })
    }


    // async listagemVolunAltView(req, res) {
    //     let pessoa = new PessoaModel();
    //     let listaPessoas = await pessoa.listarPessoa()
    //     res.render('alterar/voluntarios', { listaPessoa: listaPessoas })
    // }

    async listagemView(req, res) {
        let admin = new AdminModel()
        let listaAdmin = await admin.listar();
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa();
        res.render('listar/admin', { listaAdmin: listaAdmin, listaPessoa: listaPessoas});
    }

    async alterarView(req, res) {
        let admin = new AdminModel();
        admin = await admin.obterAdminId(req.params.id);
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        res.render('alterar/admin', { admin: admin, listaPessoa: listaPessoas});
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        if (req.body.pess_id != '' && req.body.email != '' && req.body.senha != '') {
            let admin = new AdminModel(req.body.id, req.body.pess_id, req.body.email, req.body.senha, dataCriacao, dataHoje.toISODate(), 1);

            let result = await admin.editar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Admin alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o admin, tente novamente!"
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
            let admin = new AdminModel();

            let ok = await admin.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir Admin" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = AdminController;