'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReminderList = sequelize.define('ReminderList', {
    name: DataTypes.STRING
  }, {});
  ReminderList.associate = function(models) {
    // associations can be defined here
  };
  return ReminderList;
};