const CtrlSaidaEventoModel = require("../models/ctrlSaidaEventoModel");
const PatrimonioModel = require("../models/patrimonioModel");
const AnimaisModel = require("../models/animaisModel");
const AdocaoModel = require("../models/adocaoModel");

class HomeController {

    // Redireciona para a listagem/dashboard para carregar os dados
    homeView(req, res) {
        res.redirect('/');
    }

    async listarView(req, res) {
        const patrimonio = new PatrimonioModel();
        const ctrlEvento = new CtrlSaidaEventoModel();
        const animaisModel = new AnimaisModel();
        const adocoesModel = new AdocaoModel();

        const saldoMesAtual = await patrimonio.getSaldoMesAtual();
        const saldoAnoAtual = await patrimonio.getSaldoAnoAtual();
        const qntSaida = await ctrlEvento.verificarQntSaida();
        const qntEntrada = await ctrlEvento.verificarQntEntrada();
        
        // Novas estatísticas
        const totalDisponiveis = await animaisModel.contarDisponiveis();
        const totalAdotados = await adocoesModel.contarAdotados();
        const totalPendentes = await adocoesModel.contarPendentes();

        const qntEmAberto = qntSaida - qntEntrada
        let qntEmAbertoPorcen = "0,00";
        if (qntSaida > 0) {
            const porcentagem = (((qntEntrada / qntSaida) * 100) - 100);
            qntEmAbertoPorcen = Math.abs(porcentagem).toFixed(2).replace(".", ",");
        }

        res.render('home', { 
            saldoMesAtual: saldoMesAtual || 0, 
            saldoAnoAtual: saldoAnoAtual || 0, 
            qntEmAberto: qntEmAberto || 0, 
            qntEmAbertoPorcen: qntEmAbertoPorcen || "0,00",
            totalDisponiveis: totalDisponiveis || 0,
            totalAdotados: totalAdotados || 0,
            totalPendentes: totalPendentes || 0
        });
    }

    contatoView(req, res) {
        res.render('contato');
    }

    semLayoutView(req, res) {
        res.render('semlayout', { layout: 'semlayout' });
    }

}

//permite que a classe homeController seja importado
module.exports = HomeController;