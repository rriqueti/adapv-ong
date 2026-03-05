const Database = require("../utils/database");

const banco = new Database();

class EventoModel {
    
    #even_id;
    #even_nome;
    #even_descricao;
    #even_local;
    #even_dataInicio;
    #even_dataFinal;
    #createdAt;
    #updatedAt;

    // Getters
    get even_id() { return this.#even_id }
    get even_nome() { return this.#even_nome }
    get even_descricao() { return this.#even_descricao }
    get even_local() { return this.#even_local }
    get even_dataInicio() { return this.#even_dataInicio }
    get even_dataFinal() { return this.#even_dataFinal }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters
    set even_id(value) { this.#even_id = value }
    set even_nome(value) { this.#even_nome = value }
    set even_descricao(value) { this.#even_descricao = value }
    set even_local(value) { this.#even_local = value }
    set even_dataInicio(value) { this.#even_dataInicio = value }
    set even_dataFinal(value) { this.#even_dataFinal = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor
    constructor(even_id, even_nome, even_descricao, even_local, even_dataInicio, even_dataFinal, createdAt, updatedAt) {
        
        this.#even_id = even_id;
        this.#even_nome = even_nome;
        this.#even_descricao = even_descricao;
        this.#even_local = even_local;
        this.#even_dataInicio = even_dataInicio;
        this.#even_dataFinal = even_dataFinal;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    async listarEvento(){

        let sql = "SELECT * FROM tb_eventos";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++){
            lista.push(new EventoModel(
                rows[i]["even_id"],
                rows[i]["even_nome"],
                rows[i]["even_descricao"],
                rows[i]["even_local"],
                rows[i]["even_dataInicio"],
                rows[i]["even_dataFinal"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;

    }

    async ObterEveId(id){

        let sql = "SELECT * FROM tb_eventos WHERE even_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0){
            let row = rows[0];

            return new EventoModel(
                row["even_id"],
                row["even_nome"],
                row["even_descricao"],
                row["even_local"],
                row["even_dataInicio"],
                row["even_dataFinal"],
                row["createdAt"],
                row["updatedAt"]
            );
        }

    }

    async criarEvento(){
        if (this.#even_id == 0){

            let sql = "INSERT INTO tb_eventos (even_nome, even_descricao, even_local, even_dataInicio, even_dataFinal, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)";

            let valores = [this.#even_nome, this.#even_descricao, this.#even_local, this.#even_dataInicio, this.#even_dataFinal, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;

        }
    }

    async editarEvento(){

        let sql = "UPDATE tb_eventos SET even_nome = ?, even_descricao = ?, even_local = ?, even_dataInicio = ?, even_dataFinal = ?, createdAt = ?, updatedAt = ? WHERE even_id = ?";

        let valores = [this.#even_nome, this.#even_descricao, this.#even_local, this.#even_dataInicio, this.#even_dataFinal, this.#createdAt, this.#updatedAt, this.#even_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async excluirEvento(id){
        let sql = "DELETE FROM tb_eventos WHERE even_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = EventoModel;
