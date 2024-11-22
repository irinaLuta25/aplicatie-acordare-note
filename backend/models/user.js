const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const userModel=(sequelize,DataTypes)=>{
    const user=sequelize.define(
        "user",
        {
         id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoincrement:true
         },
         firstName:DataTypes.STRING,
         lastName:DataTypes.STRING,
         email:DataTypes.STRING,
         password:DataTypes.STRING,
         role:DataTypes.BOOLEAN
        },
        {
         underscored:true,
         freezeTableName:true   
        }
    );
    return user;

}
module.exports=userModel;