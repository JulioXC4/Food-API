const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('diet', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    
  },
  {
    timestamps: false
  });
};
