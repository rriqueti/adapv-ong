const PerfilModel = require('../models/perfilModel');

class TesteController {
    async listarPerfis(req, res) {
        try {
            const perfilModel = new PerfilModel();
            const perfis = await perfilModel.listarTodos();
            res.status(200).json({
                ok: true,
                message: 'Conexão com o banco de dados e consulta bem-sucedidas!',
                data: perfis
            });
        } catch (error) {
            console.error("Erro na rota de teste de conexão:", error);
            res.status(500).json({
                ok: false,
                message: 'Falha ao conectar ou consultar o banco de dados.',
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        }
    }
}

module.exports = TesteController;