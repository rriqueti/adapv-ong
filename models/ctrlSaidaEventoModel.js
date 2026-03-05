const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class CtrlSaidaEventoModel {

    #ctrlEven_id
    #ctrlEven_desc
    #ctrlEven_estado
    #createdAt
    #updatedAt
    #prod_id
    #prod_qnt
    #even_id
    #patrim_valor
    #ani_id


    // Getters

    get ctrlEven_id() { return this.#ctrlEven_id }
    get ctrlEven_desc() { return this.#ctrlEven_desc }
    get ctrlEven_estado() { return this.#ctrlEven_estado }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }
    get prod_id() { return this.#prod_id }
    get prod_qnt() { return this.#prod_qnt }
    get even_id() { return this.#even_id }
    get patrim_valor() { return this.#patrim_valor }
    get ani_id() { return this.#ani_id }

    // Setters

    set ctrlEven_id(value) { this.#ctrlEven_id = value }
    set ctrlEven_desc(value) { this.#ctrlEven_desc = value }
    set ctrlEven_estado(value) { this.#ctrlEven_estado = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }
    set prod_id(value) { this.#prod_id = value }
    set prod_qnt(value) { this.#prod_qnt = value }
    set even_id(value) { this.#even_id = value }
    set patrim_valor(value) { this.#patrim_valor = value }
    set ani_id(value) { this.#ani_id = value }

    // Constructor

    constructor(ctrlEven_id, ctrlEven_desc, ctrlEven_estado, createdAt, updatedAt, prod_id, prod_qnt, even_id, patrim_valor, ani_id) {
        this.#ctrlEven_id = ctrlEven_id;
        this.#ctrlEven_desc = ctrlEven_desc;
        this.#ctrlEven_estado = ctrlEven_estado;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#prod_id = prod_id;
        this.#prod_qnt = prod_qnt;
        this.#even_id = even_id;
        this.#patrim_valor = patrim_valor;
        this.#ani_id = ani_id;
    }

    // Métodos

    async listar() {
        let sql = "SELECT * FROM tb_ctrlSaidaEvento";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new CtrlSaidaEventoModel(
                rows[i]["ctrlEven_id"],
                rows[i]["ctrlEven_desc"],
                rows[i]["ctrlEven_estado"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
                rows[i]["prod_id"],
                rows[i]["prod_qnt"],
                rows[i]["even_id"],
                rows[i]["patrim_valor"],
                rows[i]["ani_id"]
            ));
        }

        return lista;
    }
    
    async obterId(id) {
        let sql = "SELECT * FROM tb_ctrlSaidaEvento WHERE ctrlEven_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new CtrlSaidaEventoModel(
                row["ctrlEven_id"],
                row["ctrlEven_desc"],
                row["ctrlEven_estado"],
                row["createdAt"],
                row["updatedAt"],
                row["prod_id"],
                row["prod_qnt"],
                row["even_id"],
                row["patrim_valor"],
                row["ani_id"]
            );
        }
    }

    async obterAniId(id) {
        let sql = "SELECT * FROM tb_ctrlSaidaEvento WHERE ani_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new CtrlSaidaEventoModel(
                row["ctrlEven_id"],
                row["ctrlEven_desc"],
                row["ctrlEven_estado"],
                row["createdAt"],
                row["updatedAt"],
                row["prod_id"],
                row["prod_qnt"],
                row["even_id"],
                row["patrim_valor"],
                row["ani_id"]
            );
        }
    }

    async verificarQntSaida(){
        let sql = "SELECT * FROM tb_ctrlSaidaEvento WHERE ctrlEven_estado = 'Saida'";

        let rows = await banco.ExecutaComando(sql);

        let qnt = 0;

        for(let i = 0; i < rows.length; i++){
            qnt++;
        }

        return qnt;
    }

    async verificarQntEntrada(){
        let sql = "SELECT * FROM tb_ctrlSaidaEvento WHERE ctrlEven_estado = 'Entrada'";

        let rows = await banco.ExecutaComando(sql);

        let qnt = 0;

        for(let i = 0; i < rows.length; i++){
            qnt++;
        }

        return qnt;
    }

    async verificarEstadoEntrada(id){
        let sql = "SELECT * FROM tb_ctrlSaidaEvento WHERE even_id = ? AND ctrlEven_estado = 'Entrada'";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if(rows.length > 0){
            return true;
        }else{
            return false;
        }
    }

    async cadastrar() {
        if (this.#ctrlEven_id === 0) {
            let sql = "INSERT INTO tb_ctrlSaidaEvento (ctrlEven_desc, ctrlEven_estado, createdAt, updatedAt, prod_id, prod_qnt, even_id, patrim_valor, ani_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            let valores = [
                this.#ctrlEven_desc,
                this.#ctrlEven_estado,
                this.#createdAt,
                this.#updatedAt,
                this.#prod_id,
                this.#prod_qnt,
                this.#even_id,
                this.#patrim_valor,
                this.#ani_id
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editar() {
        let sql = "UPDATE tb_ctrlSaidaEvento SET ctrlEven_desc = ?, ctrlEven_estado = ?, createdAt = ?, updatedAt = ?, prod_id = ?, prod_qnt = ?, even_id = ?, patrim_valor = ?, ani_id = ? WHERE ctrlEven_id = ?";

        let valores = [
            this.#ctrlEven_desc,
            this.#ctrlEven_estado,
            this.#createdAt,
            this.#updatedAt,
            this.#prod_id,
            this.#prod_qnt,
            this.#even_id,
            this.#patrim_valor,
            this.#ani_id,
            this.#ctrlEven_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_ctrlSaidaEvento WHERE ctrlEven_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = CtrlSaidaEventoModel;