const DoacoesFinanceirasModel = require("../models/doacoesFinanceirasModel");

class FinanceiroController {
    async listagemView(req, res) {
        try {
            const model = new DoacoesFinanceirasModel();
            const doacoes = await model.listar();
            
            res.render('listar/financeiro', { 
                doacoes: doacoes,
                layout: 'layout' // Usando o layout padrão administrativo
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao carregar doações financeiras.");
        }
    }

    async cadastroView(req, res) {
        res.render('financeiro/cadastrar', { layout: 'layout' });
    }

    async cadastrar(req, res) {
        try {
            const { valor, metodo, recorrencia, nome, cpf, email, tel, pess_id } = req.body;
            
            const model = new DoacoesFinanceirasModel({
                dfin_valor: valor,
                dfin_metodo: metodo,
                dfin_recorrencia: recorrencia,
                dfin_nome: nome,
                dfin_cpf: cpf,
                dfin_email: email,
                dfin_telefone: tel,
                usu_id_cad: req.usuario.id, // Quem está logando a doação no admin
                pess_id: pess_id || null
            });

            await model.cadastrar();
            res.redirect('/financeiro/listar');
        } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao registrar doação.");
        }
    }
}

module.exports = FinanceiroController;
