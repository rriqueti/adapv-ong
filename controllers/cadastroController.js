const UsuarioModel = require('../models/usuarioModel');

class CadastroController {

    cadastroView(req, res) {
        // Renderiza a página de cadastro sem o layout principal
        res.render('cadastro', { layout: false, error: null });
    }
    
    async cadastrar(req, res) {
        const { name, email, telefone, nascimento, password, confirm_password } = req.body;

        // Validação dos campos
        if (!name || !email || !telefone || !nascimento || !password || !confirm_password) {
            return res.render('cadastro', {
                layout: false,
                error: "Todos os campos são obrigatórios."
            });
        }

        if (password !== confirm_password) {
            return res.render('cadastro', {
                layout: false,
                error: "As senhas não coincidem."
            });
        }

        try {
            const usuarioModel = new UsuarioModel();
            await usuarioModel.criar(name, email, password, telefone, nascimento);

            // Redireciona para o login com uma mensagem de sucesso
            res.redirect('/login?cadastro=sucesso');

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error); // Adiciona log do erro no console
            let errorMessage = "Ocorreu um erro ao criar a conta. Tente novamente.";
            
            if (error.code === 'ETIMEDOUT') {
                errorMessage = "Não foi possível conectar ao banco de dados (Timeout). Verifique a conexão e as configurações.";
            } else if (error.code === 'ER_DUP_ENTRY' || error.message === 'E-mail já cadastrado.') {
                errorMessage = "Este e-mail já está em uso. Por favor, utilize outro.";
            }

            return res.render('cadastro', {
                layout: false,
                error: errorMessage,
                // Re-popula os campos para que o usuário não perca os dados digitados
                name: name,
                email: email,
                telefone: telefone,
                nascimento: nascimento
            });
        }
    }
}

module.exports = CadastroController;