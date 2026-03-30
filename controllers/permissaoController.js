const PerfilModel = require('../models/perfilModel');
const PermissaoModel = require('../models/permissaoModel');

class PermissaoController {
    
    // Renderiza a tela de gerenciamento de permissões
    async indexView(req, res) {
        let perfilModel = new PerfilModel();
        let permissaoModel = new PermissaoModel();

        let listaPerfis = await perfilModel.listarPerfis();
        let listaPermissoes = await permissaoModel.listarPermissoes();
        let perfilPermissoes = await permissaoModel.listarPerfilPermissoes();

        // Agrupar as permissões pela primeira parte do slug (Ex: 'animal.editar' vira grupo 'animal')
        let permissoesAgrupadas = {};
        for (let p of listaPermissoes) {
            let grupo = p.perm_slug.split('.')[0]; 
            if (!permissoesAgrupadas[grupo]) {
                permissoesAgrupadas[grupo] = [];
            }
            permissoesAgrupadas[grupo].push(p);
        }

        res.render('permissoes/index', { 
            listaPerfis: listaPerfis, 
            permissoesAgrupadas: permissoesAgrupadas,
            perfilPermissoesJSON: JSON.stringify(perfilPermissoes) // Convertido para usar no script do Front-end
        });
    }

    // Recebe e salva alterações de permissões via POST (JSON)
    async salvar(req, res) {
        console.log("Recebida requisição para salvar permissões:", req.body);
        const { perfilId, permissoesIds } = req.body;

        if (!perfilId) {
            console.error("Erro: perfilId não enviado.");
            return res.json({ ok: false, msg: "Perfil não identificado." });
        }

        try {
            const permissaoModel = new PermissaoModel();
            console.log(`Salvando ${permissoesIds ? permissoesIds.length : 0} permissões para o perfil ${perfilId}`);
            const ok = await permissaoModel.salvarPerfilPermissoes(perfilId, permissoesIds);
            
            if (ok) {
                console.log("Salvo com sucesso no banco.");
                res.json({ ok: true, msg: "Permissões atualizadas com sucesso!" });
            } else {
                console.error("Model retornou falha ao salvar.");
                res.json({ ok: false, msg: "Erro ao salvar alterações no banco." });
            }
        } catch (error) {
            console.error("Erro no controle de permissões:", error);
            res.status(500).json({ ok: false, msg: "Erro interno do servidor." });
        }
    }

    // Renderiza tela de cadastro de novo perfil
    async cadastrarPerfilView(req, res) {
        res.render('permissoes/cadastrarPerfil');
    }

    // Processa o cadastro de novo perfil
    async cadastrarPerfil(req, res) {
        const { nome, descricao } = req.body;
        
        if (!nome) {
            return res.json({ ok: false, msg: "O nome do perfil é obrigatório." });
        }

        try {
            const perfilModel = new PerfilModel();
            const result = await perfilModel.cadastrar(nome, descricao);
            
            if (result) {
                res.json({ ok: true, msg: "Perfil criado com sucesso!" });
            } else {
                res.json({ ok: false, msg: "Erro ao criar perfil." });
            }
        } catch (error) {
            console.error("Erro ao cadastrar perfil:", error);
            res.status(500).json({ ok: false, msg: "Erro interno no servidor." });
        }
    }

}

module.exports = PermissaoController;