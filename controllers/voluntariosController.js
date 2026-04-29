const { DateTime } = require("luxon");
const PessoaModel = require("../models/pessoaModel");
const VoluntariosModel = require("../models/voluntariosModel");

class VoluntariosController {

    cadastroView(req, res) {
        res.render('cadastrar/voluntarios', {
            filtros: { nome: "", faixaEtaria: "" }
        });
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        const { voluntario, areaAtuacao, disponibilidade } = req.body;
        if (voluntario != '0') {
            let voluntarioModel = new VoluntariosModel(0, voluntario, areaAtuacao, disponibilidade, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await voluntarioModel.cadastrarVoluntario();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Voluntário registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar o voluntário, tente novamente!"
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
        res.render('cadastrar/voluntarios', { 
            listaPessoa: listaPessoas,
            filtros: { nome: "", faixaEtaria: "" } 
        })
    }

    async listagemView(req, res) {
        const nome = req.query.nome || "";
        const faixaEtaria = req.query.faixaEtaria || "";
        let voluntarioModel = new VoluntariosModel();
        let listaVolun = await voluntarioModel.listarVoluntarios({ nome, faixaEtaria });
        res.render('listar/voluntarios', { 
            listaVolun: listaVolun, 
            filtros: { nome, faixaEtaria } 
        });
    }

    async alterarView(req, res) {
        let voluntario = new VoluntariosModel();
        voluntario = await voluntario.obterVolId(req.params.id);
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        res.render('alterar/voluntarios', { 
            voluntario: voluntario, 
            listaPessoa: listaPessoas,
            filtros: { nome: "", faixaEtaria: "" }
        });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        const { id, voluntario, areaAtuacao, disponibilidade } = req.body;

        if (voluntario != "0") {
            let voluntarioModel = new VoluntariosModel(id, voluntario, areaAtuacao, disponibilidade, dataCriacao, dataHoje.toISODate());

            let result = await voluntarioModel.editarVoluntario();
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