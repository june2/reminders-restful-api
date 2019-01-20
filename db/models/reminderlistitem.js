'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReminderListItem = sequelize.define('ReminderListItem', {
    list_id: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    remind_at: DataTypes.DATE
  }, {});
  ReminderListItem.associate = function(models) {
    // associations can be defined here
    ReminderListItem.belongsTo(models.ReminderList, {
      foreignKey: 'list_id'
    })
  };
  return ReminderListItem;
};