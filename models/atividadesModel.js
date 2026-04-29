const Database = require("../utils/database");

const banco = new Database();

class AtividadeModel {

    #atv_id;
    #atv_nome;
    #atv_desc;
    #atv_data;
    #emp_id;
    #pro_id;
    #atv_recorrencia;
    #atv_ativo;
    #createdAt;
    #updatedAt;

    // Getters
    get atv_id() { return this.#atv_id; }
    get atv_nome() { return this.#atv_nome; }
    get atv_desc() { return this.#atv_desc; }
    get atv_data() { return this.#atv_data; }
    get emp_id() { return this.#emp_id; }
    get pro_id() { return this.#pro_id; }
    get atv_recorrencia() { return this.#atv_recorrencia; }
    get atv_ativo() { return this.#atv_ativo; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }

    // Setters
    set atv_id(value) { this.#atv_id = value; }
    set atv_nome(value) { this.#atv_nome = value; }
    set atv_desc(value) { this.#atv_desc = value; }
    set atv_data(value) { this.#atv_data = value; }
    set emp_id(value) { this.#emp_id = value; }
    set pro_id(value) { this.#pro_id = value; }
    set atv_recorrencia(value) { this.#atv_recorrencia = value; }
    set atv_ativo(value) { this.#atv_ativo = value; }
    set createdAt(value) { this.#createdAt = value; }
    set updatedAt(value) { this.#updatedAt = value; }

    // Constructor
    constructor(atv_id, atv_nome, atv_desc, atv_data, emp_id, pro_id, atv_recorrencia, atv_ativo, createdAt, updatedAt) {
        this.#atv_id = atv_id;
        this.#atv_nome = atv_nome;
        this.#atv_desc = atv_desc;
        this.#atv_data = atv_data;
        this.#emp_id = emp_id;
        this.#pro_id = pro_id;
        this.#atv_recorrencia = atv_recorrencia;
        this.#atv_ativo = atv_ativo;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // Métodos

    async listarAtividades() {
        let sql = "SELECT * FROM tb_atividades ORDER BY atv_data DESC";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AtividadeModel(
                rows[i]["atv_id"],
                rows[i]["atv_nome"],
                rows[i]["atv_desc"],
                rows[i]["atv_data"],
                rows[i]["emp_id"],
                rows[i]["pro_id"],
                rows[i]["atv_recorrencia"],
                rows[i]["atv_ativo"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }
        return lista;
    }

    async obterAtvId(id) {
        let sql = "SELECT * FROM tb_atividades WHERE atv_id = ?";
        let rows = await banco.ExecutaComando(sql, [id]);

        if (rows.length > 0) {
            let row = rows[0];
            return new AtividadeModel(
                row["atv_id"],
                row["atv_nome"],
                row["atv_desc"],
                row["atv_data"],
                row["emp_id"],
                row["pro_id"],
                row["atv_recorrencia"],
                row["atv_ativo"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
        return null;
    }

    async cadastrarAtividades() {
        let sql = "INSERT INTO tb_atividades (atv_nome, atv_desc, atv_data, emp_id, pro_id, atv_recorrencia, atv_ativo, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?)";
        let valores = [this.#atv_nome, this.#atv_desc, this.#atv_data, this.#emp_id, this.#pro_id, this.#atv_recorrencia, this.#atv_ativo, this.#createdAt, this.#updatedAt];
        
        return await banco.ExecutaComandoLastInserted(sql, valores);
    }

    async alterarAtividades() {
        let sql = "UPDATE tb_atividades SET atv_nome = ?, atv_desc = ?, atv_data = ?, emp_id = ?, pro_id = ?, atv_recorrencia = ?, atv_ativo = ?, createdAt = ?, updatedAt = ? WHERE atv_id = ?";
        let valores = [this.#atv_nome, this.#atv_desc, this.#atv_data, this.#emp_id, this.#pro_id, this.#atv_recorrencia, this.#atv_ativo, this.#createdAt, this.#updatedAt, this.#atv_id];

        return await banco.ExecutaComandoNonQuery(sql, valores);
    }

    async excluirAtividades(id) {
        let sql = "DELETE FROM tb_atividades WHERE atv_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [id]);
    }

    // Gestão de Vínculos com Voluntários (N:N)
    async vincularVoluntarios(atvId, listaVolIds) {
        if (!listaVolIds || listaVolIds.length === 0) return true;
        
        let sql = "INSERT INTO tb_atividade_disponibilidade (atv_id, vol_id) VALUES ?";
        let valores = listaVolIds.map(volId => [atvId, volId]);
        
        return await banco.ExecutaComandoNonQuery(sql, [valores]);
    }

    async limparVoluntarios(atvId) {
        let sql = "DELETE FROM tb_atividade_disponibilidade WHERE atv_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [atvId]);
    }

    async listarVoluntariosDaAtividade(atvId) {
        let sql = `SELECT v.*, p.pess_nome 
                   FROM tb_voluntarios v
                   INNER JOIN tb_pessoa p ON v.pess_id = p.pess_id
                   INNER JOIN tb_atividade_disponibilidade ad ON v.vol_id = ad.vol_id
                   WHERE ad.atv_id = ?`;
        return await banco.ExecutaComando(sql, [atvId]);
    }
}

module.exports = AtividadeModel;
