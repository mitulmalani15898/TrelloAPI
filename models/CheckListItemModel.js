module.exports = (sequelize, type) => {
  let CheckListItem = sequelize.define("CheckListItem", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    checkListId: type.INTEGER,
    checkListItemName: type.STRING,
    completed: {
      type: type.BOOLEAN,
      defaultValue: false
    }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'checkListItem'
    })

  CheckListItem.sync({ force: false })
    .then((res) => console.log("CheckListItem Table Created Succesfully...", res))
    .catch(err => console.log("Error while creating checkListItem table ", err))
  return CheckListItem;
}