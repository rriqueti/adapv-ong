const Database = require("../utils/database");

const banco = new Database();

class EmpresasModel {

    #emp_id;
    #emp_nome;
    #emp_cnpj;
    #emp_cep;
    #emp_num;
    #emp_cidade;
    #emp_estado;
    #emp_rua;
    #emp_bairro;
    #emp_complemento;
    #emp_telefone;
    #createdAt;
    #updatedAt;

    // Getters

    get emp_id() { return this.#emp_id }
    get emp_nome() { return this.#emp_nome }
    get emp_cnpj() { return this.#emp_cnpj }
    get emp_cep() { return this.#emp_cep }
    get emp_num() { return this.#emp_num }
    get emp_cidade() { return this.#emp_cidade }
    get emp_estado() { return this.#emp_estado }
    get emp_rua() { return this.#emp_rua }
    get emp_bairro() { return this.#emp_bairro }
    get emp_complemento() { return this.#emp_complemento }
    get emp_telefone() { return this.#emp_telefone }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set emp_id(value) { this.#emp_id = value }
    set emp_nome(value) { this.#emp_nome = value }
    set emp_cnpj(value) { this.#emp_cnpj = value }
    set emp_cep(value) { this.#emp_cep = value }
    set emp_num(value) { this.#emp_num = value }
    set emp_cidade(value) { this.#emp_cidade = value }
    set emp_estado(value) { this.#emp_estado = value }
    set emp_rua(value) { this.#emp_rua = value }
    set emp_bairro(value) { this.#emp_bairro = value }
    set emp_complemento(value) { this.#emp_complemento = value }
    set emp_telefone(value) { this.#emp_telefone = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(empId, empNome, empCnpj, empCep, empNum, empCidade, empEstado, empRua, empBairro, empComplemento, empTelefone, empDataCria, empDataAtualiza) {
        this.#emp_id = empId;
        this.#emp_nome = empNome;
        this.#emp_cnpj = empCnpj;
        this.#emp_cep = empCep;
        this.#emp_num = empNum;
        this.#emp_cidade = empCidade;
        this.#emp_estado = empEstado;
        this.#emp_rua = empRua;
        this.#emp_bairro = empBairro;
        this.#emp_complemento = empComplemento;
        this.#emp_telefone = empTelefone;
        this.#createdAt = empDataCria;
        this.#updatedAt = empDataAtualiza;
    }

    // Métodos

    async listarEmpresas() {
        let sql = "SELECT * FROM tb_empresas";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new EmpresasModel(
                rows[i]["emp_id"],
                rows[i]["emp_nome"],
                rows[i]["emp_cnpj"],
                rows[i]["emp_cep"],
                rows[i]["emp_num"],
                rows[i]["emp_cidade"],
                rows[i]["emp_estado"],
                rows[i]["emp_rua"],
                rows[i]["emp_bairro"],
                rows[i]["emp_complemento"],
                rows[i]["emp_telefone"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;
    }

    async obterEmpId(id) {
        let sql = "SELECT * FROM tb_empresas WHERE emp_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new EmpresasModel(
                row["emp_id"],
                row["emp_nome"],
                row["emp_cnpj"],
                row["emp_cep"],
                row["emp_num"],
                row["emp_cidade"],
                row["emp_estado"],
                row["emp_rua"],
                row["emp_bairro"],
                row["emp_complemento"],
                row["emp_telefone"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarEmpresas() {
        if (this.#emp_id == 0) {
            let sql = "INSERT INTO tb_empresas (emp_nome, emp_cnpj, emp_cep, emp_num, emp_cidade, emp_estado, emp_rua, emp_bairro, emp_complemento, emp_telefone, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#emp_nome, this.#emp_cnpj, this.#emp_cep, this.#emp_num, this.#emp_cidade, this.#emp_estado, this.#emp_rua, this.#emp_bairro, this.#emp_complemento, this.#emp_telefone, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }

    }

    async editarEmpresas() {
        let sql = "UPDATE tb_empresas SET emp_nome = ?, emp_cnpj = ?, emp_cep = ?, emp_num = ?, emp_cidade = ?, emp_estado = ?, emp_rua = ?, emp_bairro = ?, emp_complemento = ?, emp_telefone = ?, createdAt = ?, updatedAt = ? WHERE emp_id = ?";

        let valores = [this.#emp_nome, this.#emp_cnpj, this.#emp_cep, this.#emp_num, this.#emp_cidade, this.#emp_estado, this.#emp_rua, this.#emp_bairro, this.#emp_complemento, this.#emp_telefone, this.#createdAt, this.#updatedAt, this.#emp_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_empresas WHERE emp_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = EmpresasModel;