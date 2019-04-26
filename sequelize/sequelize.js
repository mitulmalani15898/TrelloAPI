const Sequelize = require('sequelize');
const { host, database, username, password } = require('../configs/database');

const UserModel = require('../models/UserModel');
const BoardModel = require('../models/BoardModel');
const TeamModel = require('../models/TeamModel');
const ListModel = require('../models/ListModel');
const CardModel = require('../models/CardModel');
const CommentModel = require('../models/CommentModel');
const CheckListModel = require('../models/CheckListModel');
const CheckListItemModel = require('../models/CheckListItemModel');

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
const List = ListModel(sequelize, Sequelize);
const Card = CardModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const CheckList = CheckListModel(sequelize, Sequelize);
const CheckListItem = CheckListItemModel(sequelize, Sequelize);

User.hasMany(Board, { foreignKey: 'userId' });
Board.belongsTo(User, { foreignKey: 'id' });

Team.hasMany(Board, { foreignKey: 'teamId' });
Board.belongsTo(Team, { foreignKey: 'id' });

Board.hasMany(List, { foreignKey: 'boardId' });
List.belongsTo(Board, { foreignKey: 'id' });

List.hasMany(Card, { foreignKey: 'listId' });
Card.belongsTo(List, { foreignKey: 'id' });

Card.hasMany(Comment, { foreignKey: 'cardId' });
Comment.belongsTo(Card, { foreignKey: 'id' });

Card.hasMany(CheckList, { foreignKey: 'cardId' });
CheckList.belongsTo(Card, { foreignKey: 'id' });

CheckList.hasMany(CheckListItem, { foreignKey: 'checkListId' });
CheckListItem.belongsTo(CheckList, { foreignKey: 'id' });

// now user and team relationship

sequelize.authenticate()
  .then(() => console.log('MySQL connnection has been established Successfully.'))
  .catch(err => console.log('Unable to connect to database', err))

module.exports = { User, Board, Team, List, Card, Comment, CheckList, CheckListItem };