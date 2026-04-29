const Database = require("../utils/database");

const banco = new Database();

class EntrevistaModel {
    #ent_id;
    #pess_id;
    #ent_experiencia_pets;
    #ent_espaco_adequado;
    #ent_tempo_disponivel;
    #ent_outros_pets;
    #createdAt;
    #updatedAt;

    get ent_id() { return this.#ent_id; }
    get pess_id() { return this.#pess_id; }
    get ent_experiencia_pets() { return this.#ent_experiencia_pets; }
    get ent_espaco_adequado() { return this.#ent_espaco_adequado; }
    get ent_tempo_disponivel() { return this.#ent_tempo_disponivel; }
    get ent_outros_pets() { return this.#ent_outros_pets; }

    constructor(id, pess_id, exp, espaco, tempo, outros, created, updated) {
        this.#ent_id = id;
        this.#pess_id = pess_id;
        this.#ent_experiencia_pets = exp;
        this.#ent_espaco_adequado = espaco;
        this.#ent_tempo_disponivel = tempo;
        this.#ent_outros_pets = outros;
        this.#createdAt = created;
        this.#updatedAt = updated;
    }

    async cadastrar() {
        let sql = "INSERT INTO tb_entrevista_adocao (pess_id, ent_experiencia_pets, ent_espaco_adequado, ent_tempo_disponivel, ent_outros_pets, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)";
        let valores = [this.#pess_id, this.#ent_experiencia_pets, this.#ent_espaco_adequado, this.#ent_tempo_disponivel, this.#ent_outros_pets, this.#createdAt, this.#updatedAt];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }

    async obterPorPessoa(pess_id) {
        let sql = "SELECT * FROM tb_entrevista_adocao WHERE pess_id = ?";
        let rows = await banco.ExecutaComando(sql, [pess_id]);
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = EntrevistaModel;
