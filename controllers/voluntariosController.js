const { DateTime } = require("luxon");
const PessoaModel = require("../models/pessoaModel");
const VoluntariosModel = require("../models/voluntariosModel");

class VoluntariosController {

    cadastroView(req, res) {
        res.render('cadastrar/voluntarios');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        if (req.body.voluntario != '0') {
            let voluntario = new VoluntariosModel(0, req.body.voluntario, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await voluntario.cadastrarVoluntario();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Voluntario registrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar a Voluntario, tente novamente!"
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
        res.render('cadastrar/voluntarios', { listaPessoa: listaPessoas })
    }


    // async listagemVolunAltView(req, res) {
    //     let pessoa = new PessoaModel();
    //     let listaPessoas = await pessoa.listarPessoa()
    //     res.render('alterar/voluntarios', { listaPessoa: listaPessoas })
    // }

    async listagemView(req, res) {
        let voluntario = new VoluntariosModel()
        let listaVolun = await voluntario.listarVoluntarios();
        res.render('listar/voluntarios', { listaVolun: listaVolun });
    }

    async alterarView(req, res) {
        let voluntario = new VoluntariosModel();
        voluntario = await voluntario.obterVolId(req.params.id);
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        res.render('alterar/voluntarios', { voluntario: voluntario, listaPessoa: listaPessoas});
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        if (req.body.voluntario != "0") {
            let voluntario = new VoluntariosModel(req.body.id, req.body.voluntario, dataCriacao, dataHoje.toISODate());

            let result = await voluntario.editarVoluntario();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Voluntário alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o voluntário, tente novamente!"
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
            let voluntario = new VoluntariosModel();

            let ok = await voluntario.excluirVoluntario(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir Voluntário" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = VoluntariosController;