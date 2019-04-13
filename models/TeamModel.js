module.exports = (sequelize, type) => {
  let Team = sequelize.define("Team", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: type.INTEGER,
    teamName: type.STRING,
    teamDescription: type.STRING,
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
      tableName: 'team'
    })

    Team.sync({ force: false })
    .then((res) => console.log("Team Table Created Succesfully...", res))
    .catch(err => console.log("Erro while creating team table ", err))
  return Team;
}