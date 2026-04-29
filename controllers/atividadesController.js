const { DateTime } = require("luxon");
const AtividadesModel = require("../models/atividadesModel");
const VoluntariosModel = require("../models/voluntariosModel");
const ProjetosModel = require("../models/projetosModel");
const EmpresasModel = require("../models/empresasModel");

class AtividadesController {
    
    async listagemCadView(req, res) {
        const voluntario = new VoluntariosModel();
        const empresa = new EmpresasModel();
        const projeto = new ProjetosModel();

        const [listaVolun, listaEmp, listaProj] = await Promise.all([
            voluntario.listarVoluntarios({ apenasAtivos: true }),
            empresa.listarEmpresas(),
            projeto.listarProjetos()
        ]);

        res.render('cadastrar/atividades', { listaVolun, listaEmp, listaProj });
    }

    async cadastrar(req, res) {
        try {
            const dataHoje = DateTime.now();
            const { nome, desc, data, pro_id, emp_id, voluntarios } = req.body;

            if (nome && desc && data) {
                const atividade = new AtividadesModel(
                    0, nome, desc, data, 
                    emp_id || null, 
                    pro_id || null, 
                    'Única', 1, 
                    dataHoje.toISODate(), dataHoje.toISODate()
                );

                const atv_id = await atividade.cadastrarAtividades();

                if (atv_id) {
                    if (voluntarios) {
                        const listaVol = Array.isArray(voluntarios) ? voluntarios : [voluntarios];
                        await atividade.vincularVoluntarios(atv_id, listaVol);
                    }
                    res.send({ ok: true, msg: "Atividade cadastrada com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar a atividade" });
                }
            } else {
                res.send({ ok: false, msg: "Parâmetros preenchidos incorretamente!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, msg: "Erro interno no servidor." });
        }
    }

    async listagemView(req, res) {
        const model = new AtividadesModel();
        const listaAtividade = await model.listarAtividades();
        
        // Para cada atividade, buscar voluntários vinculados
        for(let atv of listaAtividade) {
            atv.voluntarios = await model.listarVoluntariosDaAtividade(atv.atv_id);
        }

        res.render('listar/atividades', { listaAtividade });
    }

    async listagemAltView(req, res) {
        const model = new AtividadesModel();
        const voluntario = new VoluntariosModel();
        const empresa = new EmpresasModel();
        const projeto = new ProjetosModel();

        const [atividade, listaVolun, listaEmp, listaProj, volVinculados] = await Promise.all([
            model.obterAtvId(req.params.id),
            voluntario.listarVoluntarios({ apenasAtivos: true }),
            empresa.listarEmpresas(),
            projeto.listarProjetos(),
            model.listarVoluntariosDaAtividade(req.params.id)
        ]);

        const idsVinculados = volVinculados.map(v => v.vol_id);

        res.render('alterar/atividades', { atividade, listaVolun, listaEmp, listaProj, idsVinculados });
    }

    async alterar(req, res) {
        try {
            const dataHoje = DateTime.now();
            const { id, nome, desc, data, pro_id, emp_id, createdAt, voluntarios } = req.body;

            if (nome && desc && data) {
                const atividade = new AtividadesModel(
                    id, nome, desc, data, 
                    emp_id || null, 
                    pro_id || null, 
                    'Única', 1, 
                    createdAt, dataHoje.toISODate()
                );

                const result = await atividade.alterarAtividades();

                if (result) {
                    await atividade.limparVoluntarios(id);
                    if (voluntarios) {
                        const listaVol = Array.isArray(voluntarios) ? voluntarios : [voluntarios];
                        await atividade.vincularVoluntarios(id, listaVol);
                    }
                    res.send({ ok: true, msg: "Atividade alterada com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao alterar atividade!" });
                }
            } else {
                res.send({ ok: false, msg: "Parâmetros preenchidos incorretamente!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ ok: false, msg: "Erro interno no servidor." });
        }
    }

    async excluir(req, res) {
        if (req.body.id) {
            const atividade = new AtividadesModel();
            const ok = await atividade.excluirAtividades(req.body.id);
            if (ok) res.send({ ok: true });
            else res.send({ ok: false, msg: "Erro ao excluir atividade" });
        } else {
            res.send({ ok: false, msg: "ID não enviado" });
        }
    }
}

module.exports = AtividadesController;
