const Database = require("../utils/database");

const banco = new Database();

class DoacoesModel {

    #doa_id;
    #doa_tipo;
    #doa_desc;
    #doa_qnt;
    #doa_doador;
    #doa_cpf_cnpj;
    #doa_rg;
    #doa_data;
    #pess_id
    #createdAt;
    #updatedAt;

    // Getters
    get doa_id() { return this.#doa_id }
    get doa_tipo() { return this.#doa_tipo }
    get doa_desc() { return this.#doa_desc }
    get doa_qnt() { return this.#doa_qnt }
    get doa_doador() { return this.#doa_doador }
    get doa_cpf_cnpj() { return this.#doa_cpf_cnpj }
    get doa_rg() { return this.#doa_rg }
    get doa_data() { return this.#doa_data }
    get pess_id() { return this.#pess_id }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters
    set doa_id(value) { this.#doa_id = value }
    set doa_tipo(value) { this.#doa_tipo = value }
    set doa_desc(value) { this.#doa_desc = value }
    set doa_qnt(value) { this.#doa_qnt = value }
    set doa_doador(value) { this.#doa_doador = value }
    set doa_cpf_cnpj(value) { this.#doa_cpf_cnpj = value }
    set doa_rg(value) { this.#doa_rg = value }
    set doa_data(value) { this.#doa_data = value }
    set pess_id(value) { this.#pess_id = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(doa_id, doa_tipo, doa_desc, doa_qnt, doa_doador, doa_cpf_cnpj, doa_rg, doa_data, pess_id, createdAt, updatedAt) {

        this.#doa_id = doa_id;
        this.#doa_tipo = doa_tipo;
        this.#doa_desc = doa_desc;
        this.#doa_qnt = doa_qnt;
        this.#doa_doador = doa_doador;
        this.#doa_cpf_cnpj = doa_cpf_cnpj;
        this.#doa_rg = doa_rg;
        this.#doa_data = doa_data;
        this.#pess_id = pess_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Métodos

    async listaDoacoes() {
        let sql = "SELECT * FROM tb_doacoes";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new DoacoesModel(
                rows[i]["doa_id"],
                rows[i]["doa_tipo"],
                rows[i]["doa_desc"],
                rows[i]["doa_qnt"],
                rows[i]["doa_doador"],
                rows[i]["doa_cpf_cnpj"],
                rows[i]["doa_rg"],
                rows[i]["doa_data"],
                rows[i]["pess_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }
        return lista;
    }

    async obterDoaId(id) {
        let sql = "SELECT * FROM tb_doacoes WHERE doa_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new DoacoesModel(
                row["doa_id"],
                row["doa_tipo"],
                row["doa_desc"],
                row["doa_qnt"],
                row["doa_doador"],
                row["doa_cpf_cnpj"],
                row["doa_rg"],
                row["doa_data"],
                row["pess_id"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarDoacao() {
        if (this.#doa_id == 0) {
            let sql = "INSERT INTO tb_doacoes (doa_tipo, doa_desc, doa_qnt, doa_doador, doa_cpf_cnpj, doa_rg, doa_data, pess_id, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#doa_tipo, this.#doa_desc, this.#doa_qnt, this.#doa_doador, this.#doa_cpf_cnpj, this.#doa_rg, this.#doa_data, this.#pess_id, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            console.log(result)

            return result;
        }

    }

    async obterUltimoDoacao() {
        let sql = "SELECT * FROM tb_doacoes ORDER BY doa_id DESC LIMIT 1";

        let rows = await banco.ExecutaComando(sql);

        if (rows.length > 0) {
            let row = rows[0];
            return new DoacoesModel(
                row["doa_id"],
                row["doa_tipo"],
                row["doa_desc"],
                row["doa_qnt"],
                row["doa_doador"],
                row["doa_cpf_cnpj"],
                row["doa_rg"],
                row["doa_data"],
                row["pess_id"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async editarDoacao() {
        let sql = "UPDATE tb_doacoes SET doa_tipo = ?, doa_desc = ?, doa_qnt = ?, doa_doador = ?, doa_cpf_cnpj = ?, doa_rg = ?, doa_data = ?, pess_id = ?, createdAt = ?, updatedAt = ? WHERE doa_id = ?";

        let valores = [this.#doa_tipo, this.#doa_desc, this.#doa_qnt, this.#doa_doador, this.#doa_cpf_cnpj, this.#doa_rg, this.#doa_data, this.#pess_id, this.#createdAt, this.#updatedAt, this.#doa_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_doacoes WHERE doa_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = DoacoesModel;