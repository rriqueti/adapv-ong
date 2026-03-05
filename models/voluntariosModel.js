const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class VoluntariosModel {

    #vol_id;
    #pess_id;
    #createdAt;
    #updatedAt;

    // Getters

    get vol_id() { return this.#vol_id }
    get pess_id() { return this.#pess_id }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set vol_id(value) { this.#vol_id = value }
    set pess_id(value) { this.#pess_id = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(vol_id, pess_id, createdAt, updatedAt) {
        this.#vol_id = vol_id;
        this.#pess_id = pess_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // Métodos

    async listarVoluntarios() {
        let sql = "SELECT * FROM tb_voluntarios";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new VoluntariosModel(
                rows[i]["vol_id"],
                rows[i]["pess_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;
    }

    async listarPessoasVoluntarios() {
        let sql = "SELECT p.* FROM tb_pessoa p INNER JOIN tb_voluntarios v ON p.pess_id = v.pess_id";
    
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
    
    async obterVolId(id) {
        let sql = "SELECT * FROM tb_voluntarios WHERE vol_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new VoluntariosModel(
                row["vol_id"],
                row["pess_id"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarVoluntario() {
        if (this.#vol_id === 0) {
            let sql = "INSERT INTO tb_voluntarios (pess_id, createdAt, updatedAt) VALUES (?, ?, ?)";

            let valores = [
                this.#pess_id,
                this.#createdAt,
                this.#updatedAt
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editarVoluntario() {
        let sql = "UPDATE tb_voluntarios SET pess_id = ?, createdAt = ?, updatedAt = ? WHERE vol_id = ?";

        let valores = [
            this.#pess_id,
            this.#createdAt,
            this.#updatedAt,
            this.#vol_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirVoluntario(id) {
        let sql = "DELETE FROM tb_voluntarios WHERE vol_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = VoluntariosModel;