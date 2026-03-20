const mysql = require('mysql2/promise');

// Classe de banco de dados para a consulta de teste.
class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 5, // Limite menor para uma rota de teste
            queueLimit: 0,
            connectTimeout: 10000 // 10 segundos
        });
    }

    async query(sql, params) {
        const [results, ] = await this.pool.execute(sql, params);
        return results;
    }
}

const db = new Database();

class PerfilModel {
    async listarTodos() {
        return await db.query("SELECT * FROM tb_perfil ORDER BY perf_nome");
    }
}

module.exports = PerfilModel;