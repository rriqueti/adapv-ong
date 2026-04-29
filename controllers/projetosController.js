const { DateTime } = require("luxon");
const ProjetosModel = require("../models/projetosModel");
const AtividadeModel = require("../models/atividadesModel");
const EmpresasModel = require("../models/empresasModel");
const VoluntariosModel = require("../models/voluntariosModel");

class ProjetosController {

    async cadastroView(req, res){
        let voluntario = new VoluntariosModel();
        let listaVol = await voluntario.listarVoluntarios();
        res.render('cadastrar/projeto', { listaVol: listaVol });
    }

    async cadastrar(req, res){
        try {
            const dataHoje = DateTime.now();
            const { nome, data, desc, objetivo, voluntarios } = req.body;
            const banner = req.file ? req.file.filename : null;

            if (nome != "" && data !="" && desc !=""){
                let projeto = new ProjetosModel(0, nome, data, desc, objetivo, banner, dataHoje.toISODate(), dataHoje.toISODate());

                let pro_id = await projeto.cadastrarProjeto();

                if (pro_id) {
                    // Vincular voluntários se houver
                    if (voluntarios) {
                        let listaVol = Array.isArray(voluntarios) ? voluntarios : [voluntarios];
                        await projeto.vincularVoluntarios(pro_id, listaVol);
                    }

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
        } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, msg: "Erro interno no servidor." });
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
        let voluntario = new VoluntariosModel();
        let listaVol = await voluntario.listarVoluntarios();
        res.render('cadastrar/projeto', {listaAtiv: listaAtiv, listaEmp: listaEmp, listaVol: listaVol})
    }

    async alterarView(req, res){
        let projetoModel = new ProjetosModel();
        let projeto = await projetoModel.obterProId(req.params.id);
        
        let voluntarioModel = new VoluntariosModel();
        let listaVol = await voluntarioModel.listarVoluntarios();
        let volVinculados = await projetoModel.listarVoluntariosDoProjeto(req.params.id);
        
        // Mapear apenas os IDs para facilitar a marcação no frontend
        let idsVinculados = volVinculados.map(v => v.vol_id);

        res.render('alterar/projeto', {
            projeto: projeto, 
            listaVol: listaVol, 
            idsVinculados: idsVinculados
        });
    }

    async alterar(req, res){
        try {
            const dataHoje = DateTime.now();
            const { id, nome, data, desc, objetivo, createdAt, voluntarios } = req.body;
            
            const dataTratar = new Date(Date.parse(createdAt))
            const dataTratar2 = DateTime.fromJSDate(dataTratar)
            const dataCriacao = dataTratar2.toISODate()

            let projetoExistente = new ProjetosModel();
            projetoExistente = await projetoExistente.obterProId(id);
            
            const banner = req.file ? req.file.filename : projetoExistente.pro_banner;

            if (nome != "" && data !="" && desc !=""){
                let projeto = new ProjetosModel(id, nome, data, desc, objetivo, banner, dataCriacao, dataHoje.toISODate());

                let result = await projeto.editarProjeto();

                if (result) {
                    // Atualizar vínculos de voluntários
                    await projeto.limparVoluntarios(id);
                    if (voluntarios) {
                        let listaVol = Array.isArray(voluntarios) ? voluntarios : [voluntarios];
                        await projeto.vincularVoluntarios(id, listaVol);
                    }

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
        } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, msg: "Erro interno no servidor." });
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
