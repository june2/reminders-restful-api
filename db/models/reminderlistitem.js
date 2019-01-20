'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReminderListItem = sequelize.define('ReminderListItem', {
    name: DataTypes.STRING
  }, {});
  ReminderListItem.associate = function(models) {
    // associations can be defined here
  };
  return ReminderListItem;
};