import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { TypeModel } from "./TypeModel.js";
export const UserModel = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
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


TypeModel.hasMany(UserModel, { foreignKey: "typeusers_id" });
UserModel.belongsTo(TypeModel, { foreignKey: "typeusers_id" });