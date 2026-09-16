const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../instances/mysql');
const { gerarHashSenha } = require('../utils/authUtils');

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
{
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['senha'] }
    },
    hooks: {
      beforeSave: async (usuario) => {
        if (usuario.changed('senha') && usuario.senha) {
          usuario.senha = await gerarHashSenha(usuario.senha);
      }
    }
  }
});

module.exports = Usuario;