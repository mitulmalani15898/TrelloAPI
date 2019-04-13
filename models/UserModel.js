module.exports = (sequelize, type) => {
  let User = sequelize.define("User", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    email: {
      type: type.STRING,
      unique: true
    },
    password: type.STRING,
    isActive: {
      type: type.BOOLEAN,
      defaultValue: true
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
      tableName: 'user'
    })

  User.sync({ force: false })
    .then((res) => console.log("User Table Created Succesfully...", res))
    .catch(err => console.log("Erro while creating user table ", err))
  return User;
}