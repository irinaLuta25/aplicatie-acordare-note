const sequelize=require('sequelize');
const db=require("../config/db");

const assignmentModel=require("./assignment");
const userModel=require("./user");
const evaluationModel=require("./evaluation");
const phaseModel=require("./phase");
const subjectModel=require("./subject");
const teamModel=require("./team");

const User=userModel(db,sequelize);
const Team=teamModel(db,sequelize);
const Evaluation=evaluationModel(db,sequelize);
const Assignment=assignmentModel(db,sequelize);
const Phase=phaseModel(db,sequelize);
const Subject=subjectModel(db,sequelize);


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


Assignment.hasMany(Team,{ foreignKey: 'idAssignment' }); // FK in Team
Team.belongsTo(Assignment, { foreignKey: 'idAssignment' });

Assignment.hasMany(Phase,{ foreignKey: 'idAssignment' });
Phase.belongsTo(Assignment,{ foreignKey: 'idAssignment' }); // in phase avem FK (source model)

Subject.hasMany(Assignment,{ foreignKey: 'idSubject' }); // in assignment avem FK (target model)
Assignment.belongsTo(Subject,{ foreignKey: 'idSubject' });

module.exports={
    User,
    Evaluation,
    Team,
    Assignment,
    Phase,
    Subject,
    db
};

