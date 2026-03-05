const AdminModel = require('../models/adminModel');

class AuthMiddleware {
    
    async auth(req, res, next){
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            let adminId = req.cookies.usuarioLogado;
            let admin = new AdminModel();
            admin = await admin.obterAdminId(adminId);
            if(admin != null && admin.adm_ativo == 1) {
                next();
            }
            else{
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }
}

module.exports = AuthMiddleware;