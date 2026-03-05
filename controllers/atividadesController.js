const { DateTime } = require("luxon");
const AtividadesModel = require("../models/atividadesModel");
const VoluntariosModel = require("../models/voluntariosModel");
const ProjetosModel = require("../models/projetosModel");
const EmpresasModel = require("../models/empresasModel");
const PessoaModel = require("../models/pessoaModel");

class AtividadesController {
    cadastroView(req, res) {
        res.render('cadastrar/atividades')
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        console.log(req.body)
        if (req.body.nome != "" && req.body.desc != "" && req.body.data != "" && req.body.pro_id != "") {
            let atividades = new AtividadesModel(0, req.body.nome, req.body.desc, req.body.data, req.body.vol_id === "" ? null : req.body.vol_id, req.body.emp_id === "" ? null : req.body.emp_id, req.body.pro_id, dataHoje.toISODate(), dataHoje.toISODate());
            let result = await atividades.cadastrarAtividades();

            if (result) {   
                res.send({
                    ok: true,
                    msg: "Atividade cadastrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar a atividade"
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
        let atividade = new AtividadesModel();
        let listaAtividade = await atividade.listarAtividades();
        let voluntario = new VoluntariosModel();
        let listaVolun = await voluntario.listarVoluntarios()
        let empresa = new EmpresasModel();
        let listaEmp = await empresa.listarEmpresas()
        let projeto = new ProjetosModel();
        let listaProj = await projeto.listarProjetos()
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa()
        res.render('listar/atividades', { listaAtividade: listaAtividade, listaVolun: listaVolun, listaEmp: listaEmp, listaProj: listaProj, listaPessoa: listaPessoa})
    }

    async listagemCadView(req, res) {
        let voluntario = new VoluntariosModel();
        let listaVolun = await voluntario.listarPessoasVoluntarios()
        let empresa = new EmpresasModel();
        let listaEmp = await empresa.listarEmpresas()
        let projeto = new ProjetosModel();
        let listaProj = await projeto.listarProjetos()
        res.render('cadastrar/atividades', { listaVolun: listaVolun, listaEmp: listaEmp, listaProj: listaProj })
    }

    async alterarView(req, res) {
        res.render('alterar/atividades');
    }

    async listagemAltView(req, res) {
        let voluntario = new VoluntariosModel();
        let listaVolun = await voluntario.listarVoluntarios()
        let listaPessVolun = await voluntario.listarPessoasVoluntarios()
        let empresa = new EmpresasModel();
        let listaEmp = await empresa.listarEmpresas()
        let projeto = new ProjetosModel();
        let listaProj = await projeto.listarProjetos()
        let atividade = new AtividadesModel();
        atividade = await atividade.obterAtvId(req.params.id);
        res.render('alterar/atividades', { listaVolun: listaVolun, listaEmp: listaEmp, listaProj: listaProj, listaPessVolun: listaPessVolun, atividade: atividade})
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        const dataTratarDoa = new Date(Date.parse(req.body.data))
        const dataTratar2Doa = DateTime.fromJSDate(dataTratarDoa)
        const dataTratadaDoa = dataTratar2Doa.toISODate()
        console.log(req.body)
        if (req.body.nome != "" && req.body.desc != "" && req.body.data != "" && req.body.pro_id != "") {
            let atividade = new AtividadesModel(req.body.id, req.body.nome, req.body.desc, req.body.data, req.body.vol_id === "" ? null : req.body.vol_id, req.body.emp_id === "" ? null : req.body.emp_id, req.body.pro_id, dataCriacao, dataHoje.toISODate());

            let result = await atividade.alterarAtividades();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Atividade alterada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar atividade!"
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
            let atividade = new AtividadesModel();
            let ok = await atividade.excluirAtividades(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir atividade" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }
}

module.exports = AtividadesController; 