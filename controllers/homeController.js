const CtrlSaidaEventoModel = require("../models/ctrlSaidaEventoModel");
const PatrimonioModel = require("../models/patrimonioModel");

class HomeController {

    //método responsável por devolver o html
    homeView(req, res) {
        res.render('home');
    }

    async listarView(req, res) {
        const patrimonio = new PatrimonioModel();
        const ctrlEvento = new CtrlSaidaEventoModel();
        const saldoMesAtual = await patrimonio.getSaldoMesAtual();
        const saldoAnoAtual = await patrimonio.getSaldoAnoAtual();
        const qntSaida = await ctrlEvento.verificarQntSaida();
        const qntEntrada = await ctrlEvento.verificarQntEntrada();
        const qntEmAberto = qntSaida - qntEntrada
        let qntEmAbertoPorcen = "0,00";
        if (qntSaida > 0) {
            const porcentagem = (((qntEntrada / qntSaida) * 100) - 100);
            qntEmAbertoPorcen = Math.abs(porcentagem).toFixed(2).replace(".", ",");
        }
        res.render('home', { saldoMesAtual: saldoMesAtual, saldoAnoAtual: saldoAnoAtual, qntEmAberto: qntEmAberto, qntEmAbertoPorcen: qntEmAbertoPorcen});
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