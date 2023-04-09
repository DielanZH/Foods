const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://img.favpng.com/25/10/23/computer-icons-meal-food-png-favpng-CkrtdYwPNPsFigPs9hevLKixv.jpg"
    },
    summary: {
      type: DataTypes.STRING,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
        max: 100
      }
    },
    steps: {
      type: DataTypes.TEXT,
    },
    createdDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
    { timestamps: false });
};
