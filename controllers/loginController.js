const AdminModel = require('../models/adminModel');

class LoginController {

    loginView(req, res) {
        res.render('login/index', { layout: 'login/index' });
    }

    async login(req, res) {
        console.log(req.body);
        let msg = "";
        if(req.body.email != null && req.body.senha != null) {
            let admin = new AdminModel();
            admin = await admin.obterPorEmailSenha(req.body.email, req.body.senha);
            if(admin != null) {
                res.cookie("usuarioLogado", admin.adm_id);
                res.redirect("/");
                console.log('LOGADO')
            }
            else {
                res.redirect("/login");
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            res.redirect("/login");
            msg = "Usuário/Senha incorretos!";
        }
    }
}

module.exports = LoginController;