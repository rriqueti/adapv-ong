const Database = require("../utils/database");

const banco = new Database();

class PessoaModel {

    #pess_id;
    #pess_nome;
    #pess_cpf;
    #pess_rg;
    #pess_nasc;
    #pess_nacio;
    #pess_genero;
    #pess_tel;
    #pess_tipo
    #createdAt;
    #updatedAt;

    // Getters

    get pess_id() { return this.#pess_id }
    get pess_nome() { return this.#pess_nome }
    get pess_cpf() { return this.#pess_cpf }
    get pess_rg() { return this.#pess_rg }
    get pess_nasc() { return this.#pess_nasc }
    get pess_nacio() { return this.#pess_nacio }
    get pess_genero() { return this.#pess_genero }
    get pess_tel() { return this.#pess_tel }
    get pess_tipo() { return this.#pess_tipo }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set pess_id(value) { this.#pess_id = value }
    set pess_nome(value) { this.#pess_nome = value }
    set pess_cpf(value) { this.#pess_cpf = value }
    set pess_rg(value) { this.#pess_rg = value }
    set pess_nasc(value) { this.#pess_nasc = value }
    set pess_nacio(value) { this.#pess_nacio = value }
    set pess_genero(value) { this.#pess_genero = value }
    set pess_tel(value) { this.#pess_tel = value }
    set pess_tipo(value) { this.#pess_tipo = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(pess_id, pess_nome, pess_cpf, pess_rg, pess_nasc, pess_nacio, pess_genero, pess_tel, pess_tipo, createdAt, updatedAt) {
        this.#pess_id = pess_id;
        this.#pess_nome = pess_nome;
        this.#pess_cpf = pess_cpf;
        this.#pess_rg = pess_rg;
        this.#pess_nasc = pess_nasc;
        this.#pess_nacio = pess_nacio;
        this.#pess_genero = pess_genero;
        this.#pess_tel = pess_tel;
        this.#pess_tipo = pess_tipo;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // Métodos

    async listarPessoa() {
        let sql = "SELECT * FROM tb_pessoa";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new PessoaModel(
                rows[i]["pess_id"],
                rows[i]["pess_nome"],
                rows[i]["pess_cpf"],
                rows[i]["pess_rg"],
                rows[i]["pess_nasc"],
                rows[i]["pess_nacion"],
                rows[i]["pess_genero"],
                rows[i]["pess_tel"],
                rows[i]["pess_tipo"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;
    }

    async obterPessId(id) {
        let sql = "SELECT * FROM tb_pessoa WHERE pess_id = ?";
        let val = [id];
        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new PessoaModel(
                row["pess_id"],
                row["pess_nome"],
                row["pess_cpf"],
                row["pess_rg"],
                row["pess_nasc"],
                row["pess_nacion"],
                row["pess_genero"],
                row["pess_tel"],
                row["pess_tipo"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarPessoa() {
        if (this.#pess_id === 0) {
            let sql = "INSERT INTO tb_pessoa (pess_nome, pess_cpf, pess_rg, pess_nasc, pess_nacion, pess_genero, pess_tel, pess_tipo, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

            let valores = [this.#pess_nome, this.#pess_cpf, this.#pess_rg, this.#pess_nasc, this.#pess_nacio, this.#pess_genero, this.#pess_tel, this.#pess_tipo, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editarPessoa() {
        let sql = "UPDATE tb_pessoa SET pess_nome = ?, pess_cpf = ?, pess_rg = ?, pess_nasc = ?, pess_nacion = ?, pess_genero = ?, pess_tel = ?, pess_tipo = ?, createdAt = ?, updatedAt = ? WHERE pess_id = ?"

        let valores = [this.#pess_nome, this.#pess_cpf, this.#pess_rg, this.#pess_nasc, this.#pess_nacio, this.#pess_genero, this.#pess_tel, this.#pess_tipo, this.#createdAt, this.#updatedAt, this.#pess_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_pessoa WHERE pess_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = PessoaModel;