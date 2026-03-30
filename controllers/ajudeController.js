const jwt = require('jsonwebtoken');
const DoacoesFinanceirasModel = require("../models/doacoesFinanceirasModel");

class AjudeController {
    
    async ajudeView(req, res) {
        // Detecta se o usuário está logado via cookie (opcional para exibição de nome etc)
        const token = req.cookies.token;
        let usuarioLogado = null;
        if (token) {
            try {
                usuarioLogado = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) { }
        }

        res.render('ajude', { 
            layout: false,
            usuarioLogado: usuarioLogado
        });
    }

    async doar(req, res) {
        try {
            const { valor, frequencia, metodo, nome, email, cpf, tel } = req.body;
            
            // Detecta usuário logado
            const token = req.cookies.token;
            let usuarioLogado = null;
            if (token) {
                try {
                    usuarioLogado = jwt.verify(token, process.env.JWT_SECRET);
                } catch (err) { }
            }

            const model = new DoacoesFinanceirasModel({
                dfin_valor: valor,
                dfin_metodo: metodo,
                dfin_recorrencia: frequencia,
                dfin_nome: nome || (usuarioLogado ? usuarioLogado.nome : ""),
                dfin_cpf: cpf || "",
                dfin_email: email || (usuarioLogado ? usuarioLogado.email : ""),
                dfin_telefone: tel || "",
                pess_id: usuarioLogado ? usuarioLogado.id : null // ou id da pessoa associada
            });

            await model.cadastrar();
            
            res.status(200).json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
        }
    }
}

module.exports = AjudeController;
