const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class AdminModel {

    #adm_id;
    #pess_id;
    #adm_email;
    #adm_senha;
    #createdAt;
    #updatedAt;
    #adm_ativo;

    // Getters

    get adm_id() { return this.#adm_id }
    get pess_id() { return this.#pess_id }
    get adm_email() { return this.#adm_email }
    get adm_senha() { return this.#adm_senha }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }
    get adm_ativo() { return this.#adm_ativo }

    // Setters

    set adm_id(value) { this.#adm_id = value }
    set pess_id(value) { this.#pess_id = value }
    set adm_email(value) { this.#adm_email = value }
    set adm_senha(value) { this.#adm_senha = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }
    set adm_ativo(value) { this.#adm_ativo = value }

    // Constructor

    constructor(adm_id, pess_id, adm_email, adm_senha, createdAt, updatedAt, adm_ativo) {
        this.#adm_id = adm_id;
        this.#pess_id = pess_id;
        this.#adm_email = adm_email;
        this.#adm_senha = adm_senha;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#adm_ativo = adm_ativo;
    }

    // Métodos

    async listar() {
        let sql = "SELECT * FROM tb_adm";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AdminModel(
                rows[i]["adm_id"],
                rows[i]["pess_id"],
                rows[i]["adm_email"],
                rows[i]["adm_senha"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
                rows[i]["adm_ativo"]
            ));
        }

        return lista;
    }

    async cadastrar() {
        if (this.#adm_id === 0) {
            let sql = "INSERT INTO tb_adm (adm_id, pess_id, adm_email, adm_senha, createdAt, updatedAt, adm_ativo) VALUES (?, ?, ?, ?, ?, ?, ?)";

            let valores = [
                this.#adm_id,
                this.#pess_id,
                this.#adm_email,
                this.#adm_senha,
                this.#createdAt,
                this.#updatedAt,
                this.#adm_ativo
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editar() {
        let sql = "UPDATE tb_adm SET pess_id = ?, adm_email = ?, adm_senha = ?, createdAt = ?, updatedAt = ?, adm_ativo = ? WHERE adm_id = ?";

        let valores = [
            this.#pess_id,
            this.#adm_email,
            this.#adm_senha,
            this.#createdAt,
            this.#updatedAt,
            this.#adm_ativo,
            this.#adm_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_adm WHERE adm_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obterAdminId(id) {
        let sql = "SELECT * FROM tb_adm WHERE adm_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new AdminModel(
                row["adm_id"],
                row["pess_id"],
                row["adm_email"],
                row["adm_senha"],
                row["createdAt"],
                row["updatedAt"],
                row["adm_ativo"]
            );
        }
    }

    async obterPorEmailSenha(email, senha) {
        let sql = "SELECT * FROM tb_adm WHERE adm_email = ? AND adm_senha = ?";
        let val = [email, senha];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new AdminModel(
                row["adm_id"],
                row["pess_id"],
                row["adm_email"],
                row["adm_senha"],
                row["createdAt"],
                row["updatedAt"],
                row["adm_ativo"]
            );
        }
    }

}

module.exports = AdminModel;