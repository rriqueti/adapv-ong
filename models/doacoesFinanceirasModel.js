const Database = require("../utils/database");
const banco = new Database();

class DoacoesFinanceirasModel {
    #dfin_id;
    #dfin_valor;
    #dfin_metodo;
    #dfin_recorrencia;
    #dfin_nome;
    #dfin_cpf;
    #dfin_email;
    #dfin_telefone;
    #dfin_data;
    #usu_id_cad;
    #pess_id;

    constructor(data = {}) {
        this.#dfin_id = data.dfin_id || 0;
        this.#dfin_valor = data.dfin_valor || 0;
        this.#dfin_metodo = data.dfin_metodo || "";
        this.#dfin_recorrencia = data.dfin_recorrencia || "";
        this.#dfin_nome = data.dfin_nome || "";
        this.#dfin_cpf = data.dfin_cpf || "";
        this.#dfin_email = data.dfin_email || "";
        this.#dfin_telefone = data.dfin_telefone || "";
        this.#dfin_data = data.dfin_data || null;
        this.#usu_id_cad = data.usu_id_cad || null;
        this.#pess_id = data.pess_id || null;
    }

    // Getters
    get dfin_id() { return this.#dfin_id; }
    get dfin_valor() { return this.#dfin_valor; }
    get dfin_metodo() { return this.#dfin_metodo; }
    get dfin_recorrencia() { return this.#dfin_recorrencia; }
    get dfin_nome() { return this.#dfin_nome; }
    get dfin_cpf() { return this.#dfin_cpf; }
    get dfin_email() { return this.#dfin_email; }
    get dfin_telefone() { return this.#dfin_telefone; }
    get dfin_data() { return this.#dfin_data; }
    get usu_id_cad() { return this.#usu_id_cad; }
    get pess_id() { return this.#pess_id; }

    async listar() {
        let sql = `
            SELECT df.*, p_usu.pess_nome as cadastrado_por, p_don.pess_nome as nome_pessoa 
            FROM tb_doacoes_financeiras df
            LEFT JOIN tb_usuario u ON df.usu_id_cad = u.usu_id
            LEFT JOIN tb_pessoa p_usu ON u.pess_id = p_usu.pess_id
            LEFT JOIN tb_pessoa p_don ON df.pess_id = p_don.pess_id
            ORDER BY dfin_data DESC
        `;
        return await banco.ExecutaComando(sql);
    }

    async getSaldoMesAtual() {
        let sql = "SELECT SUM(dfin_valor) as saldo FROM tb_doacoes_financeiras WHERE MONTH(dfin_data) = MONTH(CURRENT_DATE()) AND YEAR(dfin_data) = YEAR(CURRENT_DATE())";
        let rows = await banco.ExecutaComando(sql);
        return rows[0]["saldo"] || 0;
    }

    async getSaldoAnoAtual() {
        let sql = "SELECT SUM(dfin_valor) as saldo FROM tb_doacoes_financeiras WHERE YEAR(dfin_data) = YEAR(CURRENT_DATE())";
        let rows = await banco.ExecutaComando(sql);
        return rows[0]["saldo"] || 0;
    }

    async getSaldoTotal() {
        let sql = "SELECT SUM(dfin_valor) as saldo FROM tb_doacoes_financeiras";
        let rows = await banco.ExecutaComando(sql);
        return rows[0]["saldo"] || 0;
    }

    async getTotalDoacoes() {
        let sql = "SELECT COUNT(*) as total FROM tb_doacoes_financeiras";
        let rows = await banco.ExecutaComando(sql);
        return rows[0]["total"] || 0;
    }

    async cadastrar() {
        let sql = `
            INSERT INTO tb_doacoes_financeiras 
            (dfin_valor, dfin_metodo, dfin_recorrencia, dfin_nome, dfin_cpf, dfin_email, dfin_telefone, usu_id_cad, pess_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        let valores = [
            this.#dfin_valor, 
            this.#dfin_metodo, 
            this.#dfin_recorrencia, 
            this.#dfin_nome, 
            this.#dfin_cpf, 
            this.#dfin_email, 
            this.#dfin_telefone, 
            this.#usu_id_cad, 
            this.#pess_id
        ];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }
}

module.exports = DoacoesFinanceirasModel;
