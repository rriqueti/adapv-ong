const Database = require("../utils/database");

const banco = new Database();

class EnderecoModel {

    #end_id;
    #end_cep;
    #end_rua;
    #end_bairro;
    #end_numero;
    #end_cidade;
    #end_estado;
    #end_complemento;
    #pess_id;
    #createdAt;
    #updatedAt;

    // Getters
    get end_id() { return this.#end_id }
    get end_cep() { return this.#end_cep }
    get end_rua() { return this.#end_rua }
    get end_bairro() { return this.#end_bairro }
    get end_numero() { return this.#end_numero }
    get end_cidade() { return this.#end_cidade }
    get end_estado() { return this.#end_estado }
    get end_complemento() { return this.#end_complemento }
    get pess_id() { return this.#pess_id }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters
    set end_id(value) { this.#end_id = value }
    set end_cep(value) { this.#end_cep = value }
    set end_rua(value) { this.#end_rua = value }
    set end_bairro(value) { this.#end_bairro = value }
    set end_numero(value) { this.#end_numero = value }
    set end_cidade(value) { this.#end_cidade = value }
    set end_estado(value) { this.#end_estado = value }
    set end_complemento(value) { this.#end_complemento = value }
    set pess_id(value) { this.#pess_id = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(end_id, end_cep, end_rua, end_bairro, end_numero, end_cidade, end_estado, end_complemento, pess_id, createdAt, updatedAt) {

        this.#end_id = end_id;
        this.#end_cep = end_cep;
        this.#end_rua = end_rua;
        this.#end_bairro = end_bairro;
        this.#end_numero = end_numero;
        this.#end_cidade = end_cidade;
        this.#end_estado = end_estado;
        this.#end_complemento = end_complemento;
        this.#pess_id = pess_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Métodos

    async listarEndereco() {

        let sql = "select * from tb_endereco";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new EnderecoModel(rows[i]["end_id"], rows[i]["end_cep"], rows[i]["end_rua"], rows[i]["end_bairro"], rows[i]["end_numero"], rows[i]["end_cidade"], rows[i]["end_estado"], rows[i]["end_complemento"], rows[i]["pess_id"], rows[i]["createdAt"], rows[i]["updatedAt"]));
        }

        return lista;
    }

    async obterEndId(id) {

        let sql = "select * from tb_endereco where end_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new EnderecoModel(
                row["end_id"],
                row["end_cep"],
                row["end_rua"],
                row["end_bairro"],
                row["end_numero"],
                row["end_cidade"],
                row["end_estado"],
                row["end_complemento"],
                row["pess_id"],
                row["createdAt"],
                row["updatedAt"]);

        }

    }

    async cadastrarEndereco() {
        if (this.#end_id == 0) {
            let sql = "INSERT INTO tb_endereco (end_cep, end_rua, end_bairro, end_numero, end_cidade, end_estado, end_complemento, pess_id, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#end_cep, this.#end_rua, this.#end_bairro, this.#end_numero, this.#end_cidade, this.#end_estado, this.#end_complemento, this.#pess_id, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }

    }

    async editarEndereco() {
        let sql = "UPDATE tb_endereco SET end_cep = ?, end_rua = ?, end_bairro = ?, end_numero = ?, end_cidade = ?, end_estado = ?, end_complemento = ?, pess_id = ?, createdAt = ?, updatedAt = ? WHERE end_id = ?";

        let valores = [this.#end_cep, this.#end_rua, this.#end_bairro, this.#end_numero, this.#end_cidade, this.#end_estado, this.#end_complemento, this.#pess_id, this.#createdAt, this.#updatedAt, this.#end_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_endereco WHERE end_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = EnderecoModel;