const sequelize = require("../config/db");
const {DataTypes}=require('sequelize');

const evaluationModel=(sequelize,DataTypes)=>{
    const evaluation=sequelize.define(
        "evaluation",
        {
         id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
         },
         grade:DataTypes.FLOAT,
         userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
         teamId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        },
        {
         underscored:true,
         freezeTableName:true
        }
    );
    return evaluation;
}
module.exports=evaluationModel;