const Database = require('../utils/database');

class PermissaoModel {
    
    // Busca a lista de todas as permissões cadastradas
    async listarPermissoes() {
        const db = new Database();
        const sql = `SELECT perm_id, perm_slug, perm_descricao FROM tb_permissao ORDER BY perm_slug ASC`;
        return await db.ExecutaComando(sql);
    }

    // Busca a relação entre perfis e permissões liberadas
    async listarPerfilPermissoes() {
        const db = new Database();
        const sql = `SELECT perf_id, perm_id FROM tb_perfil_permissao`;
        return await db.ExecutaComando(sql);
    }

    // Salva as permissões de um perfil em uma transação
    async salvarPerfilPermissoes(perfilId, permissoesIds) {
        const db = new Database();
        const connection = await db.conexao.promise().getConnection();
        
        try {
            await connection.beginTransaction();

            // 1. Limpa todas as permissões atuais do perfil
            await connection.execute('DELETE FROM tb_perfil_permissao WHERE perf_id = ?', [perfilId]);

            // 2. Insere as novas permissões (se houver)
            if (permissoesIds && permissoesIds.length > 0) {
                // Montar query de inserção múltipla para maior eficiência
                const placeholders = permissoesIds.map(() => '(?, ?)').join(', ');
                const values = [];
                permissoesIds.forEach(permId => {
                    values.push(perfilId, permId);
                });

                const sql = `INSERT INTO tb_perfil_permissao (perf_id, perm_id) VALUES ${placeholders}`;
                await connection.execute(sql, values);
            }

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            console.error("Erro na transação de salvar permissões:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = PermissaoModel;