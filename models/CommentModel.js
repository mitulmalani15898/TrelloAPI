module.exports = (sequelize, type) => {
  let Comment = sequelize.define("Comment", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cardId: type.INTEGER,
    comment: type.STRING,
    userId: type.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'comment'
    })

  Comment.sync({ force: false })
    .then((res) => console.log("Comment Table Created Succesfully...", res))
    .catch(err => console.log("Error while creating comment table ", err))
  return Comment;
}