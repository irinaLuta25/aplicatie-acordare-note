const sequelize=require('sequelize');
const db=require("../config/db");

const assignmentModel=require("./assignment");
const userModel=require("./user");
const evaluationModel=require("./evaluation");
const phaseModel=require("./phase");
const teamModel=require("./team");
const userAssignmentModel=require("./userAssignment");

const User=userModel(db,sequelize);
const Team=teamModel(db,sequelize);
const Evaluation=evaluationModel(db,sequelize);
const Assignment=assignmentModel(db,sequelize);
const Phase=phaseModel(db,sequelize);
const UserAssignment=userAssignmentModel(db,sequelize);


// // modelarea relatiilor directe - pt manipularea directa a datelor tabelei
// Evaluation.belongsTo(User, { foreignKey: 'userId' });
// Evaluation.belongsTo(Team, { foreignKey: 'teamId' });

// // Evaluation e un junction table - repr many to many
// User.belongsToMany(Team,{through: Evaluation}); // Evaluation va avea cele 2 FK
// Team.belongsToMany(User,{through: Evaluation})

Evaluation.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Evaluation.belongsTo(Team, { foreignKey: 'teamId', onDelete: 'CASCADE' });
User.belongsToMany(Team, { through: Evaluation, foreignKey: 'userId', onDelete: 'CASCADE' });
Team.belongsToMany(User, { through: Evaluation, foreignKey: 'teamId', onDelete: 'CASCADE' });

Assignment.hasMany(Phase,{ foreignKey: 'idAssignment' });
Phase.belongsTo(Assignment,{ foreignKey: 'idAssignment' }); // in phase avem FK (source model)

UserAssignment.belongsTo(User,{ foreignKey: 'userId', onDelete: 'CASCADE' });
UserAssignment.belongsTo(Assignment,{foreignKey:'assignmentId',onDelete:'CASCADE'});
User.belongsToMany(Assignment, { through: UserAssignment, foreignKey: 'userId', onDelete: 'CASCADE' });
Assignment.belongsToMany(User,{through:UserAssignment,foreignKey:'assignmentId',onDelete:'CASCADE'});




module.exports={
    User,
    Evaluation,
    Team,
    Assignment,
    Phase,
    UserAssignment,
    db
};

