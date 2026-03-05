const Database = require("../utils/database");

const banco = new Database();

class PatrimonioModel {

    #patrim_id;
    #patrim_saldo;
    #doa_id;
    #createdAt;
    #updatedAt;
    #patrim_valor

    // Getters

    get patrim_id() { return this.#patrim_id }
    get patrim_saldo() { return this.#patrim_saldo }
    get doa_id() { return this.#doa_id }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }
    get patrim_valor() { return this.#patrim_valor }

    // Setters

    set patrim_id(value) { this.#patrim_id = value }
    set patrim_saldo(value) { this.#patrim_saldo = value }
    set doa_id(value) { this.#doa_id = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }
    set patrim_valor(value) { this.#patrim_valor = value }

    // Constructor

    constructor(patrim_id, patrim_saldo, doa_id, createdAt, updatedAt, patrim_valor) {

        this.#patrim_id = patrim_id;
        this.#patrim_saldo = patrim_saldo;
        this.#doa_id = doa_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#patrim_valor = patrim_valor;
    }

    // Métodos

    async listar() {
        let sql = "SELECT * FROM tb_patrimonio";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new PatrimonioModel(
                rows[i]["patrim_id"],
                rows[i]["patrim_saldo"],
                rows[i]["doa_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
                rows[i]["patrim_valor"]
            ));
        }

        return lista;
    }

    async getPatrimPorDoacao(id) {
        let sql = "SELECT * FROM tb_patrimonio WHERE doa_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new PatrimonioModel(
                row["patrim_id"],
                row["patrim_saldo"],
                row["doa_id"],
                row["createdAt"],
                row["updatedAt"],
                row["patrim_valor"]
            );
        }
    }

    async getSaldoMesAtual() {
        let sql = "SELECT SUM(patrim_valor) as saldo FROM tb_patrimonio WHERE MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE())";

        let rows = await banco.ExecutaComando(sql);

        if (rows.length > 0) {
            return rows[0]["saldo"];
        }else{
            return 0;
        }
    }

    async getSaldoAnoAtual() {
        let sql = "SELECT SUM(patrim_valor) as saldo FROM tb_patrimonio WHERE YEAR(createdAt) = YEAR(CURRENT_DATE())";

        let rows = await banco.ExecutaComando(sql);

        if (rows.length > 0) {
            return rows[0]["saldo"];
        }else{
            return 0;
        }
    }

    async getSaldo() {
        let sql = "SELECT SUM(patrim_valor) as saldo FROM tb_patrimonio";

        let rows = await banco.ExecutaComando(sql);

        if (rows.length > 0) {
            return rows[0]["saldo"];
        }else{
            return 0;
        }
    }

    async getPenultSaldo(id) {
        let sql = "SELECT patrim_saldo FROM tb_patrimonio WHERE patrim_id = (SELECT patrim_id - 1 FROM tb_patrimonio WHERE patrim_id = ?);";
        let val = [id];
        let rows = await banco.ExecutaComando(sql, val);
    
        return rows[0]["patrim_saldo"];
    }
    

    async obterId(id) {
        let sql = "SELECT * FROM tb_patrimonio WHERE patrim_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new PatrimonioModel(
                row["patrim_id"],
                row["patrim_saldo"],
                row["doa_id"],
                row["createdAt"],
                row["updatedAt"],
                row["patrim_valor"]
            );
        }
    }

    async cadastrar() {
        if (this.#patrim_id === 0) {
            let sql = "INSERT INTO tb_patrimonio (patrim_saldo, doa_id, createdAt, updatedAt, patrim_valor) VALUES (?, ?, ?, ?, ?)";

            let valores = [
                this.#patrim_saldo,
                this.#doa_id,
                this.#createdAt,
                this.#updatedAt,
                this.#patrim_valor
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            

            return result;
        }
    }

    async editar() {
        let sql = "UPDATE tb_patrimonio SET patrim_saldo = ?, doa_id = ?, createdAt = ?, updatedAt = ?, patrim_valor = ? WHERE patrim_id = ?";

        let valores = [
            this.#patrim_saldo,
            this.#doa_id,
            this.#createdAt,
            this.#updatedAt,
            this.#patrim_valor,
            this.#patrim_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {

        let sql = "DELETE FROM tb_patrimonio WHERE patrim_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

}

module.exports = PatrimonioModel;