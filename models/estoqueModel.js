const Database = require("../utils/database");

const banco = new Database();

class EstoqueModel {

    #estoq_id
    #prod_id
    #doa_id
    #createdAt
    #updatedAt

    get estoq_id() { return this.#estoq_id; }
    set estoq_id(value) { this.#estoq_id = value; }

    get prod_id() { return this.#prod_id; }
    set prod_id(value) { this.#prod_id = value; }

    get doa_id() { return this.#doa_id; }
    set doa_id(value) { this.#doa_id = value; }

    get createdAt() { return this.#createdAt; }
    set createdAt(value) { this.#createdAt = value; }

    get updatedAt() { return this.#updatedAt; }
    set updatedAt(value) { this.#updatedAt = value; }

    constructor(estoq_id, prod_id, doa_id, createdAt, updatedAt) {
        this.#estoq_id = estoq_id;
        this.#prod_id = prod_id;
        this.#doa_id = doa_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    async listar() {
        let sql = "SELECT * FROM tb_estoque";

        let rows = await banco.ExecutaComando(sql);

        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new EstoqueModel(
                rows[i]["estoq_id"],
                rows[i]["prod_id"],
                rows[i]["doa_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
            ))

        }

        return lista;
    }

    async obterId(id) {
        let sql = "SELECT * FROM tb_estoque WHERE estoq_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new EstoqueModel(
                row["estoq_id"],
                row["prod_id"],
                row["doa_id"],
                row["createdAt"],
                row["updatedAt"]
            )

        }
    }

    async cadastrar() {
        if (this.#estoq_id === 0) {
            let sql = "INSERT INTO tb_estoque (prod_id, doa_id, createdAt, updatedAt) VALUES (?, ?, ?, ?)";

            let valores = [
                this.#prod_id,
                this.#doa_id,
                this.#createdAt,
                this.#updatedAt
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;

        }
    }

    async editar() {
        let sql = "UPDATE tb_estoque SET prod_id = ?, doa_id = ?, createdAt = ?, updatedAt = ? WHERE estoq_id = ?";

        let valores = [
            this.#prod_id,
            this.#doa_id,
            this.#createdAt,
            this.#updatedAt,
            this.#estoq_id
        ]

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async excluir(id) {
        let sql = "DELETE FROM tb_estoque WHERE estoq_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

}

module.exports = EstoqueModel;