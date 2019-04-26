module.exports = (sequelize, type) => {
  let CheckList = sequelize.define("CheckList", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cardId: type.INTEGER,
    checkListName: type.STRING
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'checkList'
    })

  CheckList.sync({ force: false })
    .then((res) => console.log("CheckList Table Created Succesfully...", res))
    .catch(err => console.log("Error while creating checkList table ", err))
  return CheckList;
}