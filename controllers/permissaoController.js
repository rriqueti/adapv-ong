const PerfilModel = require('../models/perfilModel');
const PermissaoModel = require('../models/permissaoModel');

class PermissaoController {
    
    // Renderiza a tela de gerenciamento de permissões
    async indexView(req, res) {
        let perfilModel = new PerfilModel();
        let permissaoModel = new PermissaoModel();

        let listaPerfis = await perfilModel.listarPerfis();
        let listaPermissoes = await permissaoModel.listarPermissoes();
        let perfilPermissoes = await permissaoModel.listarPerfilPermissoes();

        // Agrupar as permissões pela primeira parte do slug (Ex: 'animal.editar' vira grupo 'animal')
        let permissoesAgrupadas = {};
        for (let p of listaPermissoes) {
            let grupo = p.perm_slug.split('.')[0]; 
            if (!permissoesAgrupadas[grupo]) {
                permissoesAgrupadas[grupo] = [];
            }
            permissoesAgrupadas[grupo].push(p);
        }

        res.render('permissoes/index', { 
            listaPerfis: listaPerfis, 
            permissoesAgrupadas: permissoesAgrupadas,
            perfilPermissoesJSON: JSON.stringify(perfilPermissoes) // Convertido para usar no script do Front-end
        });
    }

}

module.exports = PermissaoController;