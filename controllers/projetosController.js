const { DateTime } = require("luxon");
const ProjetosModel = require("../models/projetosModel");
const AtividadeModel = require("../models/atividadesModel");
const EmpresasModel = require("../models/empresasModel");

class ProjetosController {

    cadastroView(req, res){
        res.render('cadastrar/projeto');
    }

    async cadastrar(req, res){
        const dataHoje = DateTime.now();

        if (req.body.nome != "" && req.body.data !="" && req.body.desc !=""){
            let projeto = new ProjetosModel(0, req.body.nome, req.body.data, req.body.desc, dataHoje.toISODate(), dataHoje.toISODate());

            let result = await projeto.cadastrarProjeto();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Projeto registrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar o projeto, tente novamente!"
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
        let projeto = new ProjetosModel();
        let listaPro = await projeto.listarProjetos();
        res.render('listar/projeto', {listaPro: listaPro})
    }

    async listagemAtivCad(req, res){
        let atividade = new AtividadeModel();
        let listaAtiv = await atividade.listarAtividades();
        let empresa = new EmpresasModel();
        let listaEmp = await empresa.listarEmpresas();
        res.render('cadastrar/projeto', {listaAtiv: listaAtiv, listaEmp: listaEmp})
    }

    async alterarView(req, res){
        let projeto = new ProjetosModel();

        projeto = await projeto.obterProId(req.params.id);

        res.render('alterar/projeto', {projeto: projeto});
    }

    async alterar(req, res){
        const dataHoje = DateTime.now();
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()

        console.log(req.body)

        if (req.body.nome != "" && req.body.data !="" && req.body.desc !=""){
            let projeto = new ProjetosModel(req.body.id, req.body.nome, req.body.data, req.body.desc, dataCriacao, dataHoje.toISODate());

            let result = await projeto.editarProjeto();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Projeto alterado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar o projeto, tente novamente!"
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
            let projeto = new ProjetosModel();

            let ok = await projeto.excluirProjeto(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir projeto" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = ProjetosController;