const UsuarioModel = require('../models/usuarioModel');
const PerfilModel = require('../models/perfilModel');

class UsuarioController {
    
    async listagemView(req, res) {
        try {
            const usuarioModel = new UsuarioModel();
            const usuarios = await usuarioModel.listar();
            res.render('listar/usuarios', { usuarios });
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.render('listar/usuarios', { usuarios: [], error: "Erro ao carregar usuários." });
        }
    }

    async cadastroView(req, res) {
        try {
            const perfilModel = new PerfilModel();
            const perfis = await perfilModel.listarPerfis();
            res.render('cadastrar/usuarios', { perfis });
        } catch (error) {
            console.error("Erro ao carregar perfis para cadastro:", error);
            res.render('cadastrar/usuarios', { perfis: [], error: "Erro ao carregar dados." });
        }
    }

    async cadastrar(req, res) {
        const { nome, email, senha, telefone, nascimento, perfil_id } = req.body;
        
        try {
            const usuarioModel = new UsuarioModel();
            await usuarioModel.criar(nome, email, senha, telefone, nascimento, perfil_id);
            res.send({ ok: true, msg: "Usuário cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.send({ ok: false, msg: error.message || "Erro ao cadastrar usuário." });
        }
    }

    async alterarView(req, res) {
        const id = req.params.id;
        try {
            const usuarioModel = new UsuarioModel();
            const usuario = await usuarioModel.obterPorId(id);
            const perfilModel = new PerfilModel();
            const perfis = await perfilModel.listarPerfis();
            
            if (!usuario) {
                return res.status(404).render('error', { message: "Usuário não encontrado." });
            }

            res.render('alterar/usuarios', { usuario, perfis });
        } catch (error) {
            console.error("Erro ao carregar dados para alteração:", error);
            res.status(500).render('error', { message: "Erro interno do servidor." });
        }
    }

    async alterar(req, res) {
        const { id, email, perfil_id, senha } = req.body;
        
        try {
            const usuarioModel = new UsuarioModel();
            await usuarioModel.atualizar(id, email, perfil_id, senha || null);
            res.send({ ok: true, msg: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.send({ ok: false, msg: "Erro ao atualizar usuário." });
        }
    }

    async excluir(req, res) {
        const { id } = req.body;
        
        try {
            const usuarioModel = new UsuarioModel();
            await usuarioModel.excluir(id);
            res.send({ ok: true, msg: "Usuário excluído com sucesso!" });
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            res.send({ ok: false, msg: "Erro ao excluir usuário." });
        }
    }
}

module.exports = UsuarioController;
