'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReminderList = sequelize.define('ReminderList', {
    name: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {});
  ReminderList.associate = function(models) {
    // associations can be defined here
    ReminderList.hasMany(models.ReminderListItem);
  };
  return ReminderList;
};