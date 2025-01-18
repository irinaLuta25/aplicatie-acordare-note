const {DataTypes}=require('sequelize');
const sequelize=require('../config/db');



const assignmentModel=(sequelize,DataTypes) => {
    const assignment=sequelize.define(
        "assignment",
        {
            id: {
                primaryKey:true,
                type:DataTypes.BIGINT,
                autoIncrement:true
            },
            subject:DataTypes.STRING,
            title:DataTypes.STRING,
            description:DataTypes.TEXT,
        },
        {
         underscored:true,
         freezeTableName:true 
        }
    )
    return assignment;
}

module.exports=assignmentModel;