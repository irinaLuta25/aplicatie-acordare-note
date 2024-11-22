const sequelize = require("../config/db");
const {DataTypes}=require('sequelize');

const evaluationModel=(sequelize,DataTypes)=>{
    const evaluation=sequelize.define(
        "evaluation",
        {
         id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoincrement:true
         },
         grade:DataTypes.FLOAT
        },
        {
         underscored:true,
         freezeTableName:true
        }
    );
    return evaluation;
}
module.exports=evaluationModel;