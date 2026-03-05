const { DateTime } = require("luxon");
const PessoaModel = require("../models/pessoaModel");
const AnimalModel = require("../models/animaisModel");
const AdocaoModel = require("../models/adocaoModel");

class AdocaoController {

    cadastroView(req, res) {
        res.render('cadastrar/adocao');
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();

        if (req.body.adotante != '0' && req.body.animal != '0') {
            let adocao = new AdocaoModel(0, req.body.adotante, req.body.animal, dataHoje.toISODate(), dataHoje.toISODate());

            let animal = new AnimalModel();

            let result = await adocao.criarAdocao();

            let resultAltEstado = await animal.marcarComoAdotado(req.body.animal);

            if (result && resultAltEstado) {
                res.send({
                    ok: true,
                    msg: "Adoção registrada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao registrar a adoção, tente novamente!"
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

    async listagemPessoaCadView(req, res) {
        let pessoa = new PessoaModel();
        let listaPessoas = await pessoa.listarPessoa()
        let animal = new AnimalModel();
        let listaAnimal = await animal.listarAnimaisDisponiveis(null)
        res.render('cadastrar/adocao', { listaPessoa: listaPessoas, listaAnimal: listaAnimal })
    }

    async listagemView(req, res) {
        let adocao = new AdocaoModel()
        let listaAdocao = await adocao.listarAdocao();
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa();
        let animal = new AnimalModel();
        let listaAnimal = await animal.listarAnimais();
        res.render('listar/adocao', { listaAdocao: listaAdocao, listaPessoa: listaPessoa, listaAnimal: listaAnimal});
    }

    async alterarView(req, res) {
        res.render('alterar/adocao');
    }

    async listagemAltView(req, res) {
        let adocao = new AdocaoModel();
        adocao = await adocao.obterAdoId(req.params.id);
        let pessoa = new PessoaModel();
        let listaPessoa = await pessoa.listarPessoa();
        let animal = new AnimalModel();
        let listaAnimal = await animal.listarAnimaisDisponiveis(req.params.id);
        let addAnimal = await animal.obterAnimId(adocao.ani_id);
        listaAnimal.push(addAnimal);
        res.render('alterar/adocao', { listaPessoa: listaPessoa, listaAnimal: listaAnimal, adocao: adocao });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now()
        const dataTratar = new Date(Date.parse(req.body.createdAt))
        const dataTratar2 = DateTime.fromJSDate(dataTratar)
        const dataCriacao = dataTratar2.toISODate()
        console.log(dataCriacao)

        if (req.body.adotante != "0" && req.body.animal != "0") {
            let usuario = new AdocaoModel(req.body.id, req.body.adotante, req.body.animal, dataCriacao, dataHoje.toISODate());

            let result = await usuario.editarAdocao();
            console.log(req.body, "\n\n", usuario)
            if (result) {
                res.send({
                    ok: true,
                    msg: "Adoção alterada com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao alterar a adoção, tente novamente!"
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
            let adocao = new AdocaoModel();

            let ok = await adocao.excluirAdocao(req.body.id);

            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir animal" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado." })
        }
    }

}

module.exports = AdocaoController;