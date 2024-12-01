// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

const subjectModel=(sequelize,DataTypes)=>{
    const subject=sequelize.define(
        "subject",
        {
            id:{
                primaryKey:true,
                type:DataTypes.BIGINT,
                autoIncrement:true
            },
            name:DataTypes.STRING
        },
        {
            underscored:true,
            freezeTableName:true
        }
    );
    return subject;
}
module.exports=subjectModel;