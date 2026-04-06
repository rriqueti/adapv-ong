const Database = require("../utils/database");
const banco = new Database();

class AnimalFotoModel {

    async listarPorAnimal(ani_id) {
        const sql = "SELECT * FROM tb_animais_fotos WHERE ani_id = ? ORDER BY foto_perfil DESC, foto_id ASC";
        return await banco.ExecutaComando(sql, [ani_id]);
    }

    async obterFotoPerfil(ani_id) {
        const sql = "SELECT * FROM tb_animais_fotos WHERE ani_id = ? AND foto_perfil = 1 LIMIT 1";
        const rows = await banco.ExecutaComando(sql, [ani_id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async inserir(ani_id, foto_path, createdAt) {
        const sql = "INSERT INTO tb_animais_fotos (ani_id, foto_path, foto_perfil, createdAt) VALUES (?, ?, 0, ?)";
        return await banco.ExecutaComandoNonQuery(sql, [ani_id, foto_path, createdAt]);
    }

    async inserirLastId(ani_id, foto_path, createdAt) {
        const sql = "INSERT INTO tb_animais_fotos (ani_id, foto_path, foto_perfil, createdAt) VALUES (?, ?, 0, ?)";
        return await banco.ExecutaComandoLastInserted(sql, [ani_id, foto_path, createdAt]);
    }

    async definirPerfil(foto_id, ani_id) {
        // Remove o perfil atual
        await banco.ExecutaComandoNonQuery(
            "UPDATE tb_animais_fotos SET foto_perfil = 0 WHERE ani_id = ?",
            [ani_id]
        );
        // Define a nova foto como perfil
        return await banco.ExecutaComandoNonQuery(
            "UPDATE tb_animais_fotos SET foto_perfil = 1 WHERE foto_id = ?",
            [foto_id]
        );
    }

    async excluir(foto_id) {
        const sql = "DELETE FROM tb_animais_fotos WHERE foto_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [foto_id]);
    }

    async excluirPorAnimal(ani_id) {
        const sql = "DELETE FROM tb_animais_fotos WHERE ani_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [ani_id]);
    }
}

module.exports = AnimalFotoModel;
