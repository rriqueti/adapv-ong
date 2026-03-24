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

        if (!res.locals.usuarioLogado || !res.locals.usuarioLogado.pess_id) {
            return res.status(401).send({
                ok: false,
                msg: "Usuário não autenticado ou inválido para realizar a adoção."
            });
        }

        const adotanteId = res.locals.usuarioLogado.pess_id; // O adotante é o usuário logado
        const animalId = req.body.animal;

        if (!animalId || animalId === '0' || animalId === '') {
            return res.send({
                ok: false,
                msg: "Nenhum animal válido foi selecionado para adoção."
            });
        }

        try {
            // O status é 'pendente' por padrão ao criar uma nova solicitação.
            let adocao = new AdocaoModel(0, adotanteId, animalId, dataHoje.toISODate(), dataHoje.toISODate(), 'pendente');

            let result = await adocao.criarAdocao();

            if (result) {
                res.send({
                    ok: true,
                    msg: "Solicitação de adoção enviada para análise!"
                });
            } else {
                res.send({
                    ok: false,
                    msg: "Erro ao enviar a solicitação, tente novamente!"
                });
            }
        } catch (error) {
            console.error("Erro ao cadastrar adoção:", error);
            res.status(500).send({
                ok: false,
                msg: "Ocorreu um erro no servidor ao processar a solicitação."
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
        res.render('listar/adocao', {
            listaAdocao: listaAdocao,
            permissoes: res.locals.permissoes // Passando permissões para a view
        });
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

    async atualizarStatus(req, res) {
        let { id, status } = req.body;

        // Validação básica
        if (!id || !status || !['aprovada', 'rejeitada', 'Aprovada', 'Rejeitada'].includes(status)) {
            return res.send({ ok: false, msg: "Dados inválidos para atualização." });
        }

        status = status.toLowerCase(); // Padroniza para minúsculo para evitar erro no banco

        try {
            const adocaoModel = new AdocaoModel();
            // Busca a adoção para obter o ID do animal
            const adocao = await adocaoModel.obterAdoId(id);

            if (!adocao) {
                return res.send({ ok: false, msg: "Solicitação de adoção não encontrada." });
            }

            // Atualiza o status da adoção no banco
            const statusResult = await adocaoModel.atualizarStatus(id, status);

            if (statusResult) {
                // Se a adoção for aprovada, marca o animal como indisponível
                if (status === 'aprovada') {
                    const animalModel = new AnimalModel();
                    await animalModel.marcarComoAdotado(adocao.ani_id);
                }
                res.send({ ok: true, msg: `Adoção ${status.toLowerCase()} com sucesso!` });
            } else {
                res.send({ ok: false, msg: "Erro ao atualizar o status da adoção." });
            }

        } catch (error) {
            console.error("Erro ao atualizar status da adoção:", error);
            res.send({ ok: false, msg: "Ocorreu um erro no servidor. Tente novamente." });
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