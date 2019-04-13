module.exports = (sequelize, type) => {
  let List = sequelize.define("List", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    boardId: type.INTEGER,
    listName: type.STRING,
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
      tableName: 'list'
    })

  List.sync({ force: false })
    .then((res) => console.log("List Table Created Succesfully...", res))
    .catch(err => console.log("Error while creating list table ", err))
  return List;
}