const CtrlSaidaEventoModel = require("../models/ctrlSaidaEventoModel");
const AnimaisModel = require("../models/animaisModel");
const AdocaoModel = require("../models/adocaoModel");
const DoacoesFinanceirasModel = require("../models/doacoesFinanceirasModel");
const DoacoesModel = require("../models/doacoesModel");
const ProjetosModel = require("../models/projetosModel");

class HomeController {

    // Redireciona para a listagem/dashboard para carregar os dados
    homeView(req, res) {
        res.redirect('/');
    }

    async listarView(req, res) {
        const ctrlEvento = new CtrlSaidaEventoModel();
        const animaisModel = new AnimaisModel();
        const adocoesModel = new AdocaoModel();
        const financeiroModel = new DoacoesFinanceirasModel();
        const doacoesModel = new DoacoesModel();
        const projetosModel = new ProjetosModel();

        const [
            saldoMesAtual,
            saldoAnoAtual,
            saldoTotal,
            totalDoacoesFin,
            ultimasDoacoes,
            qntSaida,
            qntEntrada,
            totalDisponiveis,
            totalAdotados,
            totalPendentes,
            proximosEventos,
            eventoHoje
        ] = await Promise.all([
            financeiroModel.getSaldoMesAtual(),
            financeiroModel.getSaldoAnoAtual(),
            financeiroModel.getSaldoTotal(),
            financeiroModel.getTotalDoacoes(),
            doacoesModel.getUltimasDoacoes(5),
            ctrlEvento.verificarQntSaida(),
            ctrlEvento.verificarQntEntrada(),
            animaisModel.contarDisponiveis(),
            adocoesModel.contarAdotados(),
            adocoesModel.contarPendentes(),
            projetosModel.obterProjetosFuturos(5),
            projetosModel.obterProjetoHoje()
        ]);

        const qntEmAberto = (qntSaida - qntEntrada) || 0;
        let qntEmAbertoPorcen = 0;
        if (qntSaida > 0) {
            qntEmAbertoPorcen = Math.abs(((qntEntrada / qntSaida) * 100) - 100).toFixed(0);
        }

        res.render('home', {
            saldoMesAtual: saldoMesAtual || 0,
            saldoAnoAtual: saldoAnoAtual || 0,
            saldoTotal: saldoTotal || 0,
            totalDoacoes: totalDoacoesFin || 0,
            ultimasDoacoes: ultimasDoacoes || [],
            qntEmAberto,
            qntEmAbertoPorcen,
            totalDisponiveis: totalDisponiveis || 0,
            totalAdotados: totalAdotados || 0,
            totalPendentes: totalPendentes || 0,
            proximosEventos: proximosEventos || [],
            eventoHoje: eventoHoje
        });
    }

    contatoView(req, res) {
        res.render('contato');
    }

    semLayoutView(req, res) {
        res.render('semlayout', { layout: 'semlayout' });
    }

}

module.exports = HomeController;
