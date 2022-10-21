const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
{
  id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  timestamps: fasle,
  freezeTableName: true,
  underscored: true,
  modelname: 'Category'
}
);


module.exports = Category;