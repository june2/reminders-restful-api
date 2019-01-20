'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReminderList = sequelize.define('ReminderList', {
    name: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  ReminderList.associate = function (models) {
    // associations can be defined here
    ReminderList.hasMany(models.ReminderListItem);
  };
  return ReminderList;
};