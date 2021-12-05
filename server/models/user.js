'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  };
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    usrdata: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.login = function (received, basedata) {
    if (!basedata) {
      reject(Error('wrong login'))
    }
    basedata = basedata.dataValues
    return new Promise(function(resolve, reject) {
      if (bcryptjs.compareSync(received.password, basedata.password)) {
        resolve(basedata)
      }
      else {
        reject(Error('wrong password'))
      }
    })
  }
  return User;
};