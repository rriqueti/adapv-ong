const { DateTime } = require("luxon");
const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class VoluntariosModel {

    #vol_id;
    #pess_id;
    #vol_area_atuacao;
    #vol_disponibilidade;
    #createdAt;
    #updatedAt;
    pess_nome; // Propriedade pública para armazenar o nome da pessoa associada

    // Getters

    get vol_id() { return this.#vol_id }
    get pess_id() { return this.#pess_id }
    get vol_area_atuacao() { return this.#vol_area_atuacao }
    get vol_disponibilidade() { return this.#vol_disponibilidade }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set vol_id(value) { this.#vol_id = value }
    set pess_id(value) { this.#pess_id = value }
    set vol_area_atuacao(value) { this.#vol_area_atuacao = value }
    set vol_disponibilidade(value) { this.#vol_disponibilidade = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(vol_id, pess_id, vol_area_atuacao, vol_disponibilidade, createdAt, updatedAt) {
        this.#vol_id = vol_id;
        this.#pess_id = pess_id;
        this.#vol_area_atuacao = vol_area_atuacao;
        this.#vol_disponibilidade = vol_disponibilidade;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // Métodos

    async listarVoluntarios(filtros = {}) {
        let sql = `SELECT v.*, p.pess_nome, p.pess_nasc 
                   FROM tb_voluntarios v
                   INNER JOIN tb_pessoa p ON v.pess_id = p.pess_id
                   WHERE 1=1`;
        let val = [];

        if (filtros.nome) {
            sql += " AND p.pess_nome LIKE ?";
            val.push(`%${filtros.nome}%`);
        }

        if (filtros.apenasAtivos) {
            sql += " AND v.vol_ativo = 1";
        }

        let rows = await banco.ExecutaComando(sql, val);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            let voluntario = new VoluntariosModel(
                rows[i]["vol_id"],
                rows[i]["pess_id"],
                rows[i]["vol_area_atuacao"],
                rows[i]["vol_disponibilidade"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            );
            voluntario.pess_nome = rows[i]["pess_nome"];
            voluntario.pess_nasc = rows[i]["pess_nasc"];
            
            // Lógica de filtro por faixa etária no código (mais flexível que SQL para idades variáveis)
            if (filtros.faixaEtaria) {
                let birthDate = rows[i]["pess_nasc"];
                let dt;
                
                if (birthDate instanceof Date) {
                    dt = DateTime.fromJSDate(birthDate);
                } else {
                    dt = DateTime.fromISO(birthDate);
                }

                const idade = dt.diffNow('years').years * -1;
                let incluir = false;
                
                if (filtros.faixaEtaria === 'jovem' && idade >= 18 && idade <= 25) incluir = true;
                else if (filtros.faixaEtaria === 'adulto' && idade > 25 && idade <= 50) incluir = true;
                else if (filtros.faixaEtaria === 'senior' && idade > 50) incluir = true;

                if (incluir) lista.push(voluntario);
            } else {
                lista.push(voluntario);
            }
        }

        return lista;
    }

    async listarPessoasVoluntarios() {
        let sql = "SELECT p.* FROM tb_pessoa p INNER JOIN tb_voluntarios v ON p.pess_id = v.pess_id";
    
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
    
        for (let i = 0; i < rows.length; i++) {
            lista.push(new PessoaModel(
                rows[i]["pess_id"],
                rows[i]["pess_nome"],
                rows[i]["pess_cpf"],
                rows[i]["pess_rg"],
                rows[i]["pess_nasc"],
                rows[i]["pess_nacion"],
                rows[i]["pess_genero"],
                rows[i]["pess_tel"],
                rows[i]["pess_tipo"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }
    
        return lista;
    }
    
    async obterVolId(id) {
        let sql = `SELECT v.*, p.pess_nome 
                   FROM tb_voluntarios v
                   INNER JOIN tb_pessoa p ON v.pess_id = p.pess_id
                   WHERE v.vol_id = ?`;
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            let voluntario = new VoluntariosModel(
                row["vol_id"],
                row["pess_id"],
                row["vol_area_atuacao"],
                row["vol_disponibilidade"],
                row["createdAt"],
                row["updatedAt"]
            );
            voluntario.pess_nome = row["pess_nome"];
            return voluntario;
        }
        return null;
    }

    async cadastrarVoluntario() {
        if (this.#vol_id === 0) {
            let sql = "INSERT INTO tb_voluntarios (pess_id, vol_area_atuacao, vol_disponibilidade, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";

            let valores = [
                this.#pess_id,
                this.#vol_area_atuacao,
                this.#vol_disponibilidade,
                this.#createdAt,
                this.#updatedAt
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editarVoluntario() {
        let sql = "UPDATE tb_voluntarios SET pess_id = ?, vol_area_atuacao = ?, vol_disponibilidade = ?, createdAt = ?, updatedAt = ? WHERE vol_id = ?";

        let valores = [
            this.#pess_id,
            this.#vol_area_atuacao,
            this.#vol_disponibilidade,
            this.#createdAt,
            this.#updatedAt,
            this.#vol_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirVoluntario(id) {
        let sql = "DELETE FROM tb_voluntarios WHERE vol_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async isVoluntario(pess_id) {
        let sql = "SELECT vol_id FROM tb_voluntarios WHERE pess_id = ?";
        let rows = await banco.ExecutaComando(sql, [pess_id]);
        return rows.length > 0;
    }

}

module.exports = VoluntariosModel;