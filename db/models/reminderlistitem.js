'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReminderListItem = sequelize.define('ReminderListItem', {
    list_id: DataTypes.INTEGER,
    name: DataTypes.STRING,        
    status: {
      type: DataTypes.STRING,
      defaultValue: 'to do'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    remind_at: DataTypes.DATE
  }, {});
  ReminderListItem.associate = function (models) {
    // associations can be defined here
    ReminderListItem.belongsTo(models.ReminderList, {
      foreignKey: 'list_id'
    })
  };
  return ReminderListItem;
};