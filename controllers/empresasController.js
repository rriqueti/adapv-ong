const { DateTime } = require("luxon");
const EmpresasModel = require("../models/empresasModel");

class EmpresasController {

    cadastroView(req, res) {
        res.render('cadastrar/empresas')
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        console.log(req.body)
        if (req.body.nome != "" && req.body.cnpj != "" && req.body.cep != "" && req.body.numero != "" && req.body.cidade != "" && req.body.estado != "" && req.body.rua != "" && req.body.bairro != "" && req.body.complemento != "" && req.body.telefone != "") {
            let empresa = new EmpresasModel(0, req.body.nome, req.body.cnpj, req.body.cep, req.body.numero, req.body.cidade, req.body.estado, req.body.rua, req.body.bairro, req.body.complemento, req.body.telefone, dataHoje.toISODate(), dataHoje.toISODate());
            let result = await empresa.cadastrarEmpresas();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Empresa cadastrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar a empresa"
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
        let empresa = new EmpresasModel();
        let listaEmpresa = await empresa.listarEmpresas()
        res.render('listar/empresas', { listaEmpresas: listaEmpresa })
    }

    async alterarView(req, res) {
        let empresa = new EmpresasModel();
        empresa = await empresa.obterEmpId(req.params.id);
        res.render('alterar/empresas', { empresa: empresa });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        console.log(req.body)
        if (req.body.nome != "" && req.body.cnpj != "" && req.body.cep != "" && req.body.numero != "" && req.body.cidade != "" && req.body.estado != "" && req.body.rua != "" && req.body.bairro != "" && req.body.complemento != "" && req.body.telefone != "") {
            let empresa = new EmpresasModel(req.body.id, req.body.nome, req.body.cnpj, req.body.cep, req.body.numero, req.body.cidade, req.body.estado, req.body.rua, req.body.bairro, req.body.complemento, req.body.telefone, dataCriacao, dataHoje.toISODate());

            let result = await empresa.editarEmpresas();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Empresa alterada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar empresa!"
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
            let empresa = new EmpresasModel();
            let ok = await empresa.excluir(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir empresa" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }

}

module.exports = EmpresasController;