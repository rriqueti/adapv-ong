const Database = require("../utils/database");

const banco = new Database();

class AdocaoModel {

    #ado_id;
    #pess_id;
    #ani_id;
    #createdAt;
    #updatedAt;
    #status;

    // Getters

    get ado_id() { return this.#ado_id }
    get pess_id() { return this.#pess_id }
    get ani_id() { return this.#ani_id }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }
    get status() { return this.#status }

    // Setters

    set ado_id(value) { this.#ado_id = value }
    set pess_id(value) { this.#pess_id = value }
    set ani_id(value) { this.#ani_id = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }
    set status(value) { this.#status = value }

    // Constructor

    constructor(ado_id, pess_id, ani_id, createdAt, updatedAt, status) {

        this.#ado_id = ado_id;
        this.#pess_id = pess_id;
        this.#ani_id = ani_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#status = status;

    }

    // Métodos

    async listarAdocao(pess_id = null) {
        let sql = `
            SELECT 
                a.*,
                p.pess_nome,
                an.ani_nome
            FROM tb_adocao a
            INNER JOIN tb_pessoa p ON a.pess_id = p.pess_id
            INNER JOIN tb_animais an ON a.ani_id = an.ani_id
        `;

        let args = [];
        if (pess_id) {
            sql += " WHERE a.pess_id = ?";
            args.push(pess_id);
        }

        sql += " ORDER BY a.createdAt DESC";

        const adocoes = await banco.ExecutaComando(sql, args);
        return adocoes;
    }

    async obterAdoId(id) {
        let sql = "SELECT * FROM tb_adocao WHERE ado_id = ?";
        let val = [id];
        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];
            return row;
        }
    }

    async obterAdoAniId(id) {
            
            let sql = "SELECT * FROM tb_adocao WHERE ani_id = ?";
    
            let val = [id];
    
            let rows = await banco.ExecutaComando(sql, val);
    
            if (rows.length > 0) {
                let row = rows[0];
                return row;
            }
    }

    async criarAdocao() {
        if (this.#ado_id == 0) {
            let sql = "INSERT INTO tb_adocao (pess_id, ani_id, createdAt, updatedAt, status) VALUES (?,?,?,?,?)";

            let valores = [this.#pess_id, this.#ani_id, this.#createdAt, this.#updatedAt, this.#status];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async atualizarStatus(id, status) {
        const sql = "UPDATE tb_adocao SET status = ? WHERE ado_id = ?";
        const valores = [status, id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async editarAdocao() {
        let sql = "UPDATE tb_adocao SET pess_id = ?, ani_id = ?, createdAt = ?, updatedAt = ?, status = ? WHERE ado_id = ?"

        let valores = [this.#pess_id, this.#ani_id, this.#createdAt, this.#updatedAt, this.#status, this.#ado_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirAdocao(id) {

        let sql = "DELETE FROM tb_adocao WHERE ado_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async contarAdotados() {
        let sql = "SELECT COUNT(*) as total FROM tb_adocao WHERE status = 'Aprovado'";
        let rows = await banco.ExecutaComando(sql);
        return rows[0].total;
    }

    async contarPendentes() {
        let sql = "SELECT COUNT(*) as total FROM tb_adocao WHERE status = 'Pendente'";
        let rows = await banco.ExecutaComando(sql);
        return rows[0].total;
    }

}

module.exports = AdocaoModel;