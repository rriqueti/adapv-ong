const Database = require("../utils/database");

const banco = new Database();

class AnimaisModel {

    #ani_id;
    #ani_nome;
    #ani_nascimento;
    #ani_raca;
    #ani_sexo;
    #ani_especie;
    #ani_pelagem;
    #ani_ester;
    #ani_estado;
    #ani_disponivel;
    #ani_descricao;
    #ani_localidade;
    #createdAt;
    #updatedAt;

    // Getters

    get ani_id() { return this.#ani_id }
    get ani_nome() { return this.#ani_nome }
    get ani_nascimento() { return this.#ani_nascimento }
    get ani_raca() { return this.#ani_raca }
    get ani_sexo() { return this.#ani_sexo }
    get ani_especie() { return this.#ani_especie }
    get ani_pelagem() { return this.#ani_pelagem }
    get ani_ester() { return this.#ani_ester }
    get ani_estado() { return this.#ani_estado }
    get ani_disponivel() { return this.#ani_disponivel }
    get ani_descricao() { return this.#ani_descricao }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set ani_id(value) { this.#ani_id = value }
    set ani_nome(value) { this.#ani_nome = value }
    set ani_nascimento(value) { this.#ani_nascimento = value }
    set ani_raca(value) { this.#ani_raca = value }
    set ani_sexo(value) { this.#ani_sexo = value }
    set ani_especie(value) { this.#ani_especie = value }
    set ani_pelagem(value) { this.#ani_pelagem = value }
    set ani_ester(value) { this.#ani_ester = value }
    set ani_estado(value) { this.#ani_estado = value }
    set ani_disponivel(value) { this.#ani_disponivel = value }
    set ani_descricao(value) { this.#ani_descricao = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(ani_id, ani_nome, ani_nascimento, ani_raca, ani_sexo, ani_especie, ani_pelagem, ani_ester, ani_estado, ani_disponivel, ani_descricao, createdAt, updatedAt) {
        this.#ani_id = ani_id;
        this.#ani_nome = ani_nome;
        this.#ani_nascimento = ani_nascimento;
        this.#ani_raca = ani_raca;
        this.#ani_sexo = ani_sexo;
        this.#ani_especie = ani_especie;
        this.#ani_pelagem = ani_pelagem;
        this.#ani_ester = ani_ester
        this.#ani_estado = ani_estado;
        this.#ani_disponivel = ani_disponivel;
        this.#ani_descricao = ani_descricao;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // Métodos

    async listarAnimais() {
        let sql = "SELECT * FROM tb_animais";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AnimaisModel(
                rows[i]["ani_id"],
                rows[i]["ani_nome"],
                rows[i]["ani_nascimento"],
                rows[i]["ani_raca"],
                rows[i]["ani_sexo"],
                rows[i]["ani_especie"],
                rows[i]["ani_pelagem"],
                rows[i]["ani_ester"],
                rows[i]["ani_estado"],
                rows[i]["ani_disponivel"],
                rows[i]["ani_descricao"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }
        return lista;
    }

    async listarAnimaisDisponiveis(id) {
        let sql = "SELECT * FROM tb_animais WHERE ani_estado = 'Habitando na ONG'";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AnimaisModel(
                rows[i]["ani_id"],
                rows[i]["ani_nome"],
                rows[i]["ani_nascimento"],
                rows[i]["ani_raca"],
                rows[i]["ani_sexo"],
                rows[i]["ani_especie"],
                rows[i]["ani_pelagem"],
                rows[i]["ani_ester"],
                rows[i]["ani_estado"],
                rows[i]["ani_disponivel"],
                rows[i]["ani_descricao"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
            console.log(lista)
        }
        return lista;
    }

    async obterAnimId(id) {
        let sql = "SELECT * FROM tb_animais WHERE ani_id = ?";
        let valores = [id];
        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new AnimaisModel(
                row["ani_id"],
                row["ani_nome"],
                row["ani_nascimento"],
                row["ani_raca"],
                row["ani_sexo"],
                row["ani_especie"],
                row["ani_pelagem"],
                row["ani_ester"],
                row["ani_estado"],
                row["ani_disponivel"],
                row["ani_descricao"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrar() {
        if (this.#ani_id == 0) {
            let sql = "insert into tb_animais (ani_nome, ani_nascimento, ani_raca, ani_sexo, ani_especie, ani_pelagem, ani_ester, ani_estado, ani_disponivel, ani_descricao, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raca, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#ani_disponivel, this.#ani_descricao, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update tb_animais set ani_nome = ?, ani_nascimento = ?, ani_raca = ?, ani_sexo = ?, ani_especie = ?, ani_pelagem = ?, ani_ester = ?, ani_estado = ?, ani_disponivel = ?, ani_descricao = ?, createdAt = ?, updatedAt = ? where ani_id = ?";

            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raca, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#ani_disponivel, this.#ani_descricao, this.#createdAt, this.#updatedAt, this.#ani_id];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    // CRIEI UMA OUTRA FUNÇÃO ALTERAR PARA CASO EXISTA UMA IMPLEMETAÇÃO QUE O FÚLVIO QUEIRA FAZER ESTÁ SEPARADO E FICA MAIS FÁCIL DE ENTENDER. MAS INICIALMENTE AS DUAS TEM A MESMA FUNÇÃO

    async alterar() {
        if (this.#ani_id == 0) {
            let sql = "insert into tb_animais (ani_nome, ani_nascimento, ani_raca, ani_sexo, ani_especie, ani_pelagem, ani_ester, ani_estado, ani_disponivel, ani_descricao, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?,?,?,?)";

            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raca, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#ani_disponivel, this.#ani_descricao, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update tb_animais set ani_nome = ?, ani_nascimento = ?, ani_raca = ?, ani_sexo = ?, ani_especie = ?, ani_pelagem = ?, ani_ester = ?, ani_estado = ?, ani_disponivel = ?, ani_descricao = ?, createdAt = ?, updatedAt = ? where ani_id = ?";

            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raca, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#ani_disponivel, this.#ani_descricao, this.#createdAt, this.#updatedAt, this.#ani_id];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async excluir(id) {
        let sql = "delete from tb_animais where ani_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async marcarComoAdotado(id) {
        let sql = "UPDATE tb_animais SET ani_estado = 'Adotado', ani_disponivel = 'Nao' WHERE ani_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async contarDisponiveis() {
        let sql = "SELECT COUNT(*) as total FROM tb_animais WHERE ani_disponivel = 'Sim' AND ani_estado = 'Habitando na ONG'";
        let rows = await banco.ExecutaComando(sql);
        return rows[0].total;
    }

}

module.exports = AnimaisModel;