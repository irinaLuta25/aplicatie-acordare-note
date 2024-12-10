const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const teamModel=(sequelize, DataTypes)=>{
    const team = sequelize.define(
        "team",
        {
            id:{
                primaryKey:true,
                type:DataTypes.BIGINT,
                autoIncrement:true
            },
            name: DataTypes.STRING,
        },
        {
            underscored:true,
            freezeTableName:true
        }
    );
    return team;
}

module.exports=teamModel;