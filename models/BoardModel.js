module.exports = (sequelize, type) => {
  let Board = sequelize.define("Board", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: type.INTEGER,
    teamId: {
      type: type.INTEGER,
      defaultValue: 0
    },
    boardName: type.STRING,
    scope: {
      type: type.INTEGER,
      defaultValue: 1
    },
    createdBy: {
      type: type.INTEGER,
      defaultValue: 0
    },
    createdDate: {
      type: type.DATE,
      defaultValue: type.fn('NOW')
    },
    updatedBy: {
      type: type.INTEGER,
      defaultValue: 0
    },
    updatedDate: {
      type: type.DATE,
      defaultValue: type.fn('NOW')
    }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'board'
    })

  Board.sync({ force: false })
    .then((res) => console.log("Board Table Created Succesfully...", res))
    .catch(err => console.log("Error while creating board table ", err))
  return Board;
}