const Sequelize = require('sequelize');
const { host, database, username, password } = require('../configs/database');

const UserModel = require('../models/UserModel');
const BoardModel = require('../models/BoardModel');
const TeamModel = require('../models/TeamModel');

const Op = Sequelize.Op;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  operatorsAliases: Op,
  port: 3306
})

const User = UserModel(sequelize, Sequelize);
const Board = BoardModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);

User.hasMany(Board, { foreignKey: 'userId'});
Board.belongsTo(User, { foreignKey: 'id'});

Team.hasMany(Board, { foreignKey: 'teamId'});
Board.belongsTo(Team, { foreignKey: 'id'});

// now user and team relationship

sequelize.authenticate()
  .then(() => console.log('MySQL connnection has been established Successfully.'))
  .catch(err => console.log('Unable to connect to database', err))

module.exports = { User, Board, Team };