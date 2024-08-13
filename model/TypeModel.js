import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
export const TypeModel = sequelize.define("typeModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},
{
    timestamps: false,
},);

