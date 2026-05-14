const Database = require("../utils/database");

const banco = new Database();

class EstoqueModel {

    #estoq_id
    #prod_id
    #doa_id
    #prod_nome
    #prod_qnt
    #prod_valor
    #prod_marca
    #prod_validade
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

    get prod_nome() { return this.#prod_nome; }
    set prod_nome(value) { this.#prod_nome = value; }

    get prod_qnt() { return this.#prod_qnt; }
    set prod_qnt(value) { this.#prod_qnt = value; }

    get prod_valor() { return this.#prod_valor; }
    set prod_valor(value) { this.#prod_valor = value; }

    get prod_marca() { return this.#prod_marca; }
    set prod_marca(value) { this.#prod_marca = value; }

    get prod_validade() { return this.#prod_validade; }
    set prod_validade(value) { this.#prod_validade = value; }


    constructor(estoq_id, prod_id, doa_id, prod_nome, prod_qnt, prod_valor, prod_marca,prod_validade, createdAt, updatedAt) {
        this.#estoq_id = estoq_id;
        this.#prod_id = prod_id;
        this.#doa_id = doa_id;
        this.#prod_nome = prod_nome;
        this.#prod_qnt = prod_qnt;
        this.#prod_valor = prod_valor;
        this.#prod_marca = prod_marca
        this.#prod_validade = prod_validade;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }
async listar() {

    let sql = `
        SELECT 
            e.estoq_id,
            e.prod_id,
            e.doa_id,
            e.createdAt,
            e.updatedAt,

            p.prod_nome,
            p.prod_qnt,
            p.prod_valor,
            p.prod_marca,
            p.prod_validade,
            p.prod_tipo

        FROM tb_estoque e

        INNER JOIN tb_produtos p
        ON e.prod_id = p.prod_id
    `;

    let rows = await banco.ExecutaComando(sql);

    return rows;
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