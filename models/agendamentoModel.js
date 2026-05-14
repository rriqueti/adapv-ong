const Database = require("../utils/database");

const banco = new Database();

class AgendamentoModel {

    #agendamento_id;

    #doador_nome;

    #produto_nome;
    #produto_tipo;
    #quantidade;
    #produto_validade;
    #produto_marca;

    #data_doacao;
    #hora_doacao;

    #endereco;

    #status_agendamento;

    #createdAt;
    #updatedAt;

    constructor(

        agendamento_id,

        doador_nome,

        produto_nome,
        produto_tipo,
        quantidade,
        produto_validade,
        produto_marca,

        data_doacao,
        hora_doacao,

        endereco,

        status_agendamento,

        createdAt,
        updatedAt

    ) {

        this.#agendamento_id = agendamento_id;

        this.#doador_nome = doador_nome;

        this.#produto_nome = produto_nome;
        this.#produto_tipo = produto_tipo;
        this.#quantidade = quantidade;
        this.#produto_validade = produto_validade;
        this.#produto_marca = produto_marca;

        this.#data_doacao = data_doacao;
        this.#hora_doacao = hora_doacao;

        this.#endereco = endereco;

        this.#status_agendamento = status_agendamento;

        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    async cadastrar() {

        let sql = `
            INSERT INTO tb_agendamento
            (
                doador_nome,
                produto_nome,
                produto_tipo,
                quantidade,
                produto_validade,
                produto_marca,
                data_doacao,
                hora_doacao,
                endereco,
                status_agendamento,
                createdAt,
                updatedAt
            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        let valores = [

            this.#doador_nome,
            this.#produto_nome,
            this.#produto_tipo,
            this.#quantidade,
            this.#produto_validade,
            this.#produto_marca,
            this.#data_doacao,
            this.#hora_doacao,
            this.#endereco,
            this.#status_agendamento,
            this.#createdAt,
            this.#updatedAt
        ];

        let resultado = await banco.ExecutaComandoNonQuery(sql, valores);

        return resultado;
    }

    async listar() {

        let sql = `
            SELECT * FROM tb_agendamento
        `;

        return await banco.ExecutaComando(sql);
    }

    async concluir(id) {

    let sql = `
        UPDATE tb_agendamento
        SET status_agendamento = 'Concluído'
        WHERE agendamento_id = ?
    `;

    return await banco.ExecutaComandoNonQuery(sql, [id]);
}

async cancelar(id) {

    let sql = `
        UPDATE tb_agendamento
        SET status_agendamento = 'Cancelado'
        WHERE agendamento_id = ?
    `;

    return await banco.ExecutaComandoNonQuery(sql, [id]);
}
}

module.exports = AgendamentoModel;