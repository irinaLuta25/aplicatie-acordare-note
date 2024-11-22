const sequelize=require('sequelize');
const db=require("../config/db");

const assignmentModel=require("./assignment");
const userModel=require("./user");
const evaluationModel=require("./evaluation");
const phaseModel=require("./phase");
const subjectModel=require("./subject");
const teamModel=require("./team");

const User=userModel(db,sequelize);
const Assignment=assignmentModel(db,sequelize);
const Phase=phaseModel(db,sequelize);
const Evaluation=evaluationModel(db,sequelize);
const Team=teamModel(db,sequelize);
const Subject=subjectModel(db,sequelize);

Evaluation.hasMany(User);
User.belongsTo(Evaluation);

Evaluation.hasMany(Team);
Team.belongsTo(Evaluation);

Assignment.hasMany(Team);
Team.belongsTo(Assignment);

Assignment.hasMany(Phase);
Phase.belongsTo(Assignment);

Subject.hasMany(Assignment);
Assignment.belongsTo(Subject);

module.exports={
    User,
    Evaluation,
    Team,
    Assignment,
    Phase,
    Subject,
    db
};

