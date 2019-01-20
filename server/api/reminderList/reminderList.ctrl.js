'use strict';

import models from '~/db/models';

export default {
  create: async (ctx, next) => {
    try {
      let name = ctx.request.body.name;
      if (!name) {
        return ctx.res.unprocessableEntity({ data: 'error', message: 'name cannot be blank' });
      }
      let reminderList = await models.ReminderList.create({ name: name });
      return ctx.res.created({ data: { name: reminderList.name } });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  read: async (ctx, next) => {
    try {
      let reminderList = await models.ReminderList.findAll({
        attributes: ['id', 'name', 'created_at'],        
        order: [
          ['created_at', 'DESC'],          
        ],
      });
      return ctx.res.ok({ data: {lists: reminderList} });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  update: async (ctx, next) => {
    try {
      let id = ctx.params.list_id;
      let name = ctx.request.body.name;
      // check id
      let reminderList = await models.ReminderList.findById(id);
      if (null == reminderList) {
        return ctx.res.notFound({ message: `ID ${id} not found` }); // if id not found
      }
      if (!name) {
        return ctx.res.unprocessableEntity({ data: 'error', message: 'name cannot be blank' });
      }
      reminderList.name = name;
      reminderList.save();
      return ctx.res.ok({ data: { name: reminderList.name } });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  destroy: async (ctx, next) => {
    try {
      let id = ctx.params.list_id;
      let result = await models.ReminderList.destroy({
        where: { id: id }
      });
      if (result === 1) return ctx.res.ok({ data: `success` });
      else return ctx.res.notFound({ message: `ID ${id} not found` }); // if id not found
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  readItems: async (ctx, next) => {
    try {
      let id = ctx.params.list_id;
      // check id
      let reminderList = await models.ReminderList.findById(id);
      if (null == reminderList) {
        return ctx.res.notFound({ message: `ID ${id} not found` }); // if id not found
      }
      let reminderListItems = await models.ReminderListItem.findAll({
        attributes: ['id', 'name', 'status', 'remind_at', 'created_at'],
        order: [
          ['created_at', 'DESC'],          
        ],
        where: { list_id: id }
      });
      return ctx.res.ok({ data: {items:reminderListItems} });
    } catch (e) { 
      ctx.throw(500, e);
    }
  },
  createItem: async (ctx, next) => {
    try {
      let list_id = ctx.params.list_id;
      let remind_at = ctx.request.body.remind_at;
      let name = ctx.request.body.name;
      // check params
      if (!list_id) {
        return ctx.res.unprocessableEntity({ data: 'error', message: 'list_id cannot be blank' });
      }
      if (!remind_at) {
        return ctx.res.unprocessableEntity({ data: 'error', message: 'remind_at cannot be blank' });
      }
      if (!name) {
        return ctx.res.unprocessableEntity({ data: 'error', message: 'name cannot be blank' });
      }
      // check id
      let reminderList = await models.ReminderList.findById(list_id);
      if (null == reminderList) {
        return ctx.res.notFound({ message: `ID ${id} not found` }); // if id not found
      }
      let ReminderListItem = await models.ReminderListItem.create({ list_id: list_id, name: name, remind_at: remind_at });
      return ctx.res.created({ data: { name: ReminderListItem.name } });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  updateItem: async (ctx, next) => {
    try {
      let list_id = ctx.params.list_id;
      let item_id = ctx.params.item_id;
      let name = ctx.request.body.name;
      let remind_at = ctx.request.body.remind_at;
      let status = ctx.request.body.status;
      let ENUM_STATUS = ['to do', 'completed']
      // check id
      let reminderListItems = await models.ReminderListItem.findOne({
        attributes: ['id', 'name', 'status', 'remind_at', 'created_at'],
        where: { id: item_id }
      });
      if (null == reminderListItems) {
        return ctx.res.notFound({ message: `ID ${item_id} not found` }); // if id not found
      }
      // update params
      if (name) {
        reminderListItems.name = name;
      }
      if (ENUM_STATUS.includes(status)) {        
        reminderListItems.status = status;
      }
      if (remind_at) {
        reminderListItems.remind_at = remind_at;
      }
      reminderListItems.save();
      return ctx.res.ok({ data: reminderListItems });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  destroyItem: async (ctx, next) => {
    try {
      let list_id = ctx.params.list_id;
      let item_id = ctx.params.item_id;
      // check id
      let reminderListItems = await models.ReminderListItem.findOne({
        attributes: ['id', 'name', 'status', 'remind_at', 'created_at'],
        where: { id: item_id }
      });
      if (null == reminderListItems) {
        return ctx.res.notFound({ message: `ID ${item_id} not found` }); // if id not found
      }
      // 실제 삭제하지는 않고 status를 deleted로 변경한다.
      reminderListItems.status = 'deleted';
      reminderListItems.save();
      return ctx.res.ok({ data: { status: reminderListItems.status } });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
}