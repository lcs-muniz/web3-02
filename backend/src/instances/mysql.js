const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

if (!dbConfig.database || !dbConfig.username || !dbConfig.host) {
  console.error("❌ Erro fatal: Variáveis de ambiente do banco não foram carregadas!");
  process.exit(1);
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: env === 'test' ? false : console.log,
  }
);

const conectarBanco = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, conectarBanco };