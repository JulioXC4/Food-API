const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false
  });
};
