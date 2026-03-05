const Database = require("../utils/database");

const banco = new Database();

class AtividadeModel {

    #atv_id;
    #atv_nome;
    #atv_desc;
    #atv_data;
    #vol_id;
    #emp_id;
    #pro_id;
    #createdAt;
    #updatedAt;

    // Getters
    get atv_id() { return this.#atv_id; }
    get atv_nome() { return this.#atv_nome; }
    get atv_desc() { return this.#atv_desc; }
    get atv_data() { return this.#atv_data; }
    get vol_id() { return this.#vol_id; }
    get emp_id() { return this.#emp_id; }
    get pro_id() { return this.#pro_id; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }

    // Setters

    set atv_id(value) { this.#atv_id = value; }
    set atv_nome(value) { this.#atv_nome = value; }
    set atv_desc(value) { this.#atv_desc = value; }
    set atv_data(value) { this.#atv_data = value; }
    set vol_id(value) { this.#vol_id = value; }
    set emp_id(value) { this.#emp_id = value; }
    set pro_id(value) { this.#pro_id = value; }
    set createdAt(value) { this.#createdAt = value; }
    set updatedAt(value) { this.#updatedAt = value; }

    // Constructor

    constructor(atv_id, atv_nome, atv_desc, atv_data, vol_id, emp_id, pro_id, createdAt, updatedAt) {
        this.#atv_id = atv_id;
        this.#atv_nome = atv_nome;
        this.#atv_desc = atv_desc;
        this.#atv_data = atv_data;
        this.#vol_id = vol_id;
        this.#emp_id = emp_id;
        this.#pro_id = pro_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // Métodos

    async listarAtividades() {
        let sql = "SELECT * FROM tb_atividades";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AtividadeModel(
                rows[i]["atv_id"],
                rows[i]["atv_nome"],
                rows[i]["atv_desc"],
                rows[i]["atv_data"],
                rows[i]["vol_id"],
                rows[i]["emp_id"],
                rows[i]["pro_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;
    }

    async obterAtvId(id) {
        let sql = "SELECT * FROM tb_atividades WHERE atv_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];
            return new AtividadeModel(
                row["atv_id"],
                row["atv_nome"],
                row["atv_desc"],
                row["atv_data"],
                row["vol_id"],
                row["emp_id"],
                row["pro_id"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarAtividades() {
        if (this.#atv_id == 0) {
            let sql = "INSERT INTO tb_atividades (atv_nome, atv_desc, atv_data, vol_id, emp_id, pro_id, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?)";

            let valores = [this.#atv_nome, this.#atv_desc, this.#atv_data, this.#vol_id, this.#emp_id, this.#pro_id, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result
        }
    }

    async alterarAtividades() {
        let sql = "UPDATE tb_atividades SET atv_nome = ?, atv_desc = ?, atv_data = ?, vol_id = ?, emp_id = ?, pro_id = ?, createdAt = ?, updatedAt = ? WHERE atv_id = ?";

        let valores = [this.#atv_nome, this.#atv_desc, this.#atv_data, this.#vol_id, this.#emp_id, this.#pro_id, this.#createdAt, this.#updatedAt, this.#atv_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirAtividades(id) {
        let sql = "DELETE FROM tb_atividades WHERE atv_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = AtividadeModel;