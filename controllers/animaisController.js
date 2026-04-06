const { DateTime } = require("luxon");
const AnimaisModel = require("../models/animaisModel");
const AdocaoModel = require("../models/adocaoModel");
const CtrlSaidaEventoModel = require("../models/ctrlSaidaEventoModel");
const EspecieModel = require("../models/especieModel");
const AnimalFotoModel = require("../models/animalFotoModel");
const path = require('path');
const fs = require('fs');

class AnimalController {

    async cadastroView(req, res) {
        const especieModel = new EspecieModel();
        const listaEspecies = await especieModel.listar();
        res.render('cadastrar/animais', { listaEspecies });
    }

    async cadastrar(req, res) {
        const dataHoje = DateTime.now();
        const { nome, campoData, raca, sexo, especie, pelagem, ester, disp, desc, localidade, dataDesconhecida, fotoPerfil } = req.body;

        if (nome && sexo && especie && disp && localidade) {
            const finalRaca = (raca && raca.trim() !== '') ? raca : 'Sem raça definida';
            const finalData = dataDesconhecida === 'on' ? null : (campoData || null);

            let animal = new AnimaisModel(
                0, nome, finalData, finalRaca, sexo, especie,
                pelagem || null, ester || null, null,
                disp, desc || null, dataHoje.toISODate(), dataHoje.toISODate(), localidade
            );

            let result = await animal.cadastrar();

            if (result) {
                // Processar fotos enviadas
                if (req.files && req.files.length > 0) {
                    const fotoModel = new AnimalFotoModel();
                    // Buscar o ID do animal recém-cadastrado
                    const todosAnimais = await new AnimaisModel().listarAnimais();
                    const ultimoAnimal = todosAnimais[todosAnimais.length - 1];
                    const aniId = ultimoAnimal ? ultimoAnimal.ani_id : null;

                    if (aniId) {
                        for (let i = 0; i < req.files.length; i++) {
                            const file = req.files[i];
                            const fotoPath = '/uploads/animais/' + file.filename;
                            await fotoModel.inserir(aniId, fotoPath, dataHoje.toISODate());
                        }

                        // Definir foto de perfil (índice vem do body)
                        if (fotoPerfil !== undefined && fotoPerfil !== null && fotoPerfil !== '') {
                            const todasFotos = await fotoModel.listarPorAnimal(aniId);
                            const perfilIdx = parseInt(fotoPerfil, 10);
                            if (todasFotos[perfilIdx]) {
                                await fotoModel.definirPerfil(todasFotos[perfilIdx].foto_id, aniId);
                            }
                        } else if (req.files.length > 0) {
                            // Se não escolheu, a primeira vira perfil
                            const todasFotos = await fotoModel.listarPorAnimal(aniId);
                            if (todasFotos[0]) {
                                await fotoModel.definirPerfil(todasFotos[0].foto_id, aniId);
                            }
                        }
                    }
                }

                res.send({ ok: true, msg: "Animal cadastrado com sucesso!" });
            } else {
                res.send({ ok: false, msg: "Erro ao cadastrar animal!" });
            }
        } else {
            res.send({ ok: false, msg: "Parâmetros preenchidos incorretamente!" });
        }
    }

    async listagemView(req, res) {
        let animal = new AnimaisModel();
        let listaAnimais = await animal.listarAnimais();
        const fotoModel = new AnimalFotoModel();

        // Para cada animal, busca foto de perfil
        const listaComFotos = await Promise.all(listaAnimais.map(async (a) => {
            const foto = await fotoModel.obterFotoPerfil(a.ani_id);
            return { ...a, fotoPerfil: foto ? foto.foto_path : null };
        }));

        res.render('listar/animais', { lista: listaComFotos });
    }

    async alterarView(req, res) {
        let animais = new AnimaisModel();
        animais = await animais.obterAnimId(req.params.id);
        const especieModel = new EspecieModel();
        const listaEspecies = await especieModel.listar();
        const fotoModel = new AnimalFotoModel();
        const fotos = await fotoModel.listarPorAnimal(req.params.id);
        res.render('alterar/animais', { animais, listaEspecies, fotos });
    }

    async alterar(req, res) {
        const dataHoje = DateTime.now();
        const { id, nome, campoData, raca, sexo, especie, pelagem, ester, disp, desc, localidade, dataDesconhecida, createdAt, fotoPerfil } = req.body;

        const dataTratar = new Date(Date.parse(createdAt));
        const dataTratar2 = DateTime.fromJSDate(dataTratar);
        const dataCriacao = dataTratar2.toISODate();

        if (id && nome && sexo && especie && disp && localidade) {
            const finalRaca = (raca && raca.trim() !== '') ? raca : 'Sem raça definida';
            const finalData = dataDesconhecida === 'on' ? null : (campoData || null);

            let animal = new AnimaisModel(
                id, nome, finalData, finalRaca, sexo, especie,
                pelagem || null, ester || null, null,
                disp, desc || null, dataCriacao, dataHoje.toISODate(), localidade
            );

            let result = await animal.alterar();

            if (result) {
                // Processar novas fotos enviadas
                if (req.files && req.files.length > 0) {
                    const fotoModel = new AnimalFotoModel();
                    for (let i = 0; i < req.files.length; i++) {
                        const file = req.files[i];
                        const fotoPath = '/uploads/animais/' + file.filename;
                        await fotoModel.inserir(id, fotoPath, dataHoje.toISODate());
                    }
                }

                // Definir foto de perfil se escolhida
                if (fotoPerfil !== undefined && fotoPerfil !== null && fotoPerfil !== '') {
                    const fotoModel = new AnimalFotoModel();
                    await fotoModel.definirPerfil(fotoPerfil, id);
                }

                res.send({ ok: true, msg: "Animal alterado com sucesso!" });
            } else {
                res.send({ ok: false, msg: "Erro ao alterar animal!" });
            }
        } else {
            res.send({ ok: false, msg: "Parâmetros preenchidos incorretamente!" });
        }
    }

    async excluirFoto(req, res) {
        const { foto_id, foto_path } = req.body;
        if (!foto_id) return res.send({ ok: false, msg: "ID da foto não informado." });

        try {
            const fotoModel = new AnimalFotoModel();
            await fotoModel.excluir(foto_id);

            // Remove o arquivo físico
            if (foto_path) {
                const filePath = path.join(__dirname, '../public', foto_path);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }

            res.send({ ok: true, msg: "Foto removida com sucesso." });
        } catch (err) {
            console.error(err);
            res.send({ ok: false, msg: "Erro ao remover foto." });
        }
    }

    async definirFotoPerfil(req, res) {
        const { foto_id, ani_id } = req.body;
        if (!foto_id || !ani_id) return res.send({ ok: false, msg: "Dados incompletos." });

        try {
            const fotoModel = new AnimalFotoModel();
            await fotoModel.definirPerfil(foto_id, ani_id);
            res.send({ ok: true, msg: "Foto de perfil atualizada." });
        } catch (err) {
            console.error(err);
            res.send({ ok: false, msg: "Erro ao definir foto de perfil." });
        }
    }

    async excluir(req, res) {
        if (req.body.id != null) {
            let animal = new AnimaisModel();
            let adocao = new AdocaoModel();
            let ctrlSaidaEvento = new CtrlSaidaEventoModel();
            let verificar = await adocao.obterAdoAniId(req.body.id);
            let verificar2 = await ctrlSaidaEvento.obterAniId(req.body.id);

            if (verificar || verificar2) {
                return res.send({ ok: false, msg: "Não é possível excluir um animal já registrado em uma atividade do sistema!" });
            } else {
                let ok = await animal.excluir(req.body.id);
                if (ok) {
                    res.send({ ok: true });
                } else {
                    res.send({ ok: false, msg: "Erro ao excluir animal" });
                }
            }
        } else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" });
        }
    }
}

module.exports = AnimalController;