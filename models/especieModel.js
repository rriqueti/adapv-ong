const Database = require("../utils/database");
const banco = new Database();

class EspecieModel {
    #esp_id;
    #esp_nome;

    get esp_id() { return this.#esp_id; }
    set esp_id(value) { this.#esp_id = value; }

    get esp_nome() { return this.#esp_nome; }
    set esp_nome(value) { this.#esp_nome = value; }

    constructor(esp_id, esp_nome) {
        this.#esp_id = esp_id;
        this.#esp_nome = esp_nome;
    }

    async listar() {
        let sql = "SELECT * FROM tb_especies ORDER BY esp_nome";
        let rows = await banco.ExecutaComando(sql);
        return rows.map(row => new EspecieModel(row.esp_id, row.esp_nome));
    }

    async obterPorId(id) {
        let sql = "SELECT * FROM tb_especies WHERE esp_id = ?";
        let rows = await banco.ExecutaComando(sql, [id]);
        if (rows.length > 0) {
            return new EspecieModel(rows[0].esp_id, rows[0].esp_nome);
        }
        return null;
    }
}

module.exports = EspecieModel;
