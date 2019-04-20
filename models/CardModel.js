module.exports = (sequelize, type) => {
  let Card = sequelize.define("Card", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    listId: type.INTEGER,
    cardName: type.STRING,
    description: {
      type: type.STRING,
      defaultValue: null
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
      tableName: 'card'
    })

  Card.sync({ force: false })
    .then((res) => console.log("Card Table Created Succesfully...", res))
    .catch(err => console.log("Error while creating card table ", err))
  return Card;
}