const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const phaseModel=(sequelize,DataTypes)=>{
    const phase = sequelize.define(
        "phase",
        {
            id:{
                primaryKey:true,
                type:DataTypes.BIGINT,
                autoincrement:true
            },
            name: DataTypes.STRING,
            deadline: DataTypes.DATE,
            description: DataTypes.TEXT,
            receiveGrade: DataTypes.FLOAT
        },
        {
            underscored:true,
            freezeTableName:true
        }
    );
    return phase;
}

module.exports=phaseModel;