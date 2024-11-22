const { timeStamp } = require('console');
const { charsets } = require('mime');
const Sequelize=require('sequelize');
const sequelize=new Sequelize('acordare_note',"root",'',{
    dialect:'mysql',
    host:"localhost",
    define:{
        charset:"utf8",
        collate:"utf8_general_ci",
        timeStamp:true
    }
});
module.exports=sequelize;

