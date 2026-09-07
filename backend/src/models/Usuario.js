const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../instances/mysql');

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
    hooks: {
      beforeSave: async (usuario) => {
        if (usuario.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
      }
    }
  }
);

module.exports = Usuario;