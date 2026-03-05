const Database = require("../utils/database");

const banco = new Database();

class ProjetosModel {

    #pro_id;
    #pro_nome;
    #pro_data;
    #pro_desc;
    #createdAt;
    #updatedAt;

    // Getters

    get pro_id() { return this.#pro_id }
    get pro_nome() { return this.#pro_nome }
    get pro_data() { return this.#pro_data }
    get pro_desc() { return this.#pro_desc }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set pro_id(value) { this.#pro_id = value }
    set pro_nome(value) { this.#pro_nome = value }
    set pro_data(value) { this.#pro_data = value }
    set pro_desc(value) { this.#pro_desc = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(pro_id, pro_nome, pro_data, pro_desc, createdAt, updatedAt) {

        this.#pro_id = pro_id;
        this.#pro_nome = pro_nome;
        this.#pro_data = pro_data;
        this.#pro_desc = pro_desc;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Métodos

    async listarProjetos() {
        let sql = "SELECT * FROM tb_projetos";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new ProjetosModel(
                rows[i]["pro_id"],
                rows[i]["pro_nome"],
                rows[i]["pro_data"],
                rows[i]["pro_desc"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
            ));
        }

        return lista;
    }

    async obterProId(id) {
        let sql = "SELECT * FROM tb_projetos WHERE pro_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new ProjetosModel(
                row["pro_id"],
                row["pro_nome"],
                row["pro_data"],
                row["pro_desc"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarProjeto() {
        if (this.#pro_id === 0) {
            let sql = "INSERT INTO tb_projetos (pro_nome, pro_data, pro_desc, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";

            let valores = [
                this.#pro_nome,
                this.#pro_data,
                this.#pro_desc,
                this.#createdAt,
                this.#updatedAt
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editarProjeto() {
        let sql = "UPDATE tb_projetos SET pro_nome = ?, pro_data = ?, pro_desc = ?, createdAt = ?, updatedAt = ? WHERE pro_id = ?";

        let valores = [
            this.#pro_nome,
            this.#pro_data,
            this.#pro_desc,
            this.#createdAt,
            this.#updatedAt,
            this.#pro_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirProjeto(id) {

        let sql = "DELETE FROM tb_projetos WHERE pro_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

}

module.exports = ProjetosModel;