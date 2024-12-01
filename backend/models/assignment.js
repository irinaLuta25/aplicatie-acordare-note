const {DataTypes}=require('sequelize');
const sequelize=require('../config/db');

const subjectModel=require("./subject");


const assignmentModel=(sequelize,DataTypes) => {
    const assignment=sequelize.define(
        "assignment",
        {
            id: {
                primaryKey:true,
                type:DataTypes.BIGINT,
                autoIncrement:true
            },
            title:DataTypes.STRING,
            description:DataTypes.TEXT,
            enrollmentDeadline:DataTypes.DATE,
            idSubject: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'subject',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        {
         underscored:true,
         freezeTableName:true 
        }
    )
    return assignment;
}

module.exports=assignmentModel;