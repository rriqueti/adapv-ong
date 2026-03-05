const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class ProdutosModel {

    #prod_id;
    #prod_nome;
    #prod_tipo;
    #prod_desc;
    #prod_qnt;
    #createdAt;
    #updatedAt;
    #prod_situa;
    #prod_valor;

    // Getters

    get prod_id() { return this.#prod_id }
    get prod_nome() { return this.#prod_nome }
    get prod_tipo() { return this.#prod_tipo }
    get prod_desc() { return this.#prod_desc }
    get prod_qnt() { return this.#prod_qnt }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }
    get prod_situa() { return this.#prod_situa }
    get prod_valor() { return this.#prod_valor }

    // Setters

    set prod_id(value) { this.#prod_id = value }
    set prod_nome(value) { this.#prod_nome = value }
    set prod_tipo(value) { this.#prod_tipo = value }
    set prod_desc(value) { this.#prod_desc = value }
    set prod_qnt(value) { this.#prod_qnt = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }
    set prod_situa(value) { this.#prod_situa = value }
    set prod_valor(value) { this.#prod_valor = value }

    // Constructor

    constructor(prod_id, prod_nome, prod_tipo, prod_desc, prod_qnt, createdAt, updatedAt, prod_situa, prod_valor) {
        this.#prod_id = prod_id;
        this.#prod_nome = prod_nome;
        this.#prod_tipo = prod_tipo;
        this.#prod_desc = prod_desc;
        this.#prod_qnt = prod_qnt;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#prod_situa = prod_situa;
        this.#prod_valor = prod_valor;
    }

    // Métodos

    async listar() {
        let sql = "SELECT * FROM tb_produtos";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new ProdutosModel(
                rows[i]["prod_id"],
                rows[i]["prod_nome"],
                rows[i]["prod_tipo"],
                rows[i]["prod_desc"],
                rows[i]["prod_qnt"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
                rows[i]["prod_situa"],
                rows[i]["prod_valor"]
            ));
        }

        return lista;
    }
    
    async obterId(id) {
        let sql = "SELECT * FROM tb_produtos WHERE prod_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new ProdutosModel(
                row["prod_id"],
                row["prod_nome"],
                row["prod_tipo"],
                row["prod_desc"],
                row["prod_qnt"],
                row["createdAt"],
                row["updatedAt"],
                row["prod_situa"],
                row["prod_valor"]
            );
        }
    }

    async cadastrar() {
        if (this.#prod_id === 0) {
            let sql = "INSERT INTO tb_produtos (prod_id, prod_nome, prod_tipo, prod_desc, prod_qnt, createdAt, updatedAt, prod_situa, prod_valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            let valores = [
                this.#prod_id,
                this.#prod_nome,
                this.#prod_tipo,
                this.#prod_desc,
                this.#prod_qnt,
                this.#createdAt,
                this.#updatedAt,
                this.#prod_situa,
                this.#prod_valor
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editar() {
        let sql = "UPDATE tb_produtos SET prod_nome = ?, prod_tipo = ?, prod_desc = ?, prod_qnt = ?, createdAt = ?, updatedAt = ?, prod_situa = ?, prod_valor = ? WHERE prod_id = ?";

        let valores = [
            this.#prod_nome,
            this.#prod_tipo,
            this.#prod_desc,
            this.#prod_qnt,
            this.#createdAt,
            this.#updatedAt,
            this.#prod_situa,
            this.#prod_valor,
            this.#prod_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_produtos WHERE prod_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = ProdutosModel;