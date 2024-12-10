const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const userAssignmentModel=(sequelize,DataTypes)=>{
    const userAssignment=sequelize.define(
        "userAssignment",
        {
         id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
         },
         userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
         assignmentId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'assignment',
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
    return userAssignment;
}
module.exports=userAssignmentModel;