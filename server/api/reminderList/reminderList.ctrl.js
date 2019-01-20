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
        order: ['created_at']
      });
      return ctx.res.ok({ data: reminderList });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  update: async (ctx, next) => {
    try {
      let id = ctx.params.id;
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
      let id = ctx.params.id;
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
      let id = ctx.params.id;
      // check id
      let reminderList = await models.ReminderList.findById(id);
      if (null == reminderList) {
        return ctx.res.notFound({ message: `ID ${id} not found` }); // if id not found
      }      
      let reminderListItems = await models.ReminderListItem.findAll({
        attributes: ['id', 'name', 'status', 'remind_at', 'created_at'],
        order: ['created_at'],
        where: { list_id: id }
      });
      return ctx.res.ok({ data: reminderListItems });
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  createItem: async (ctx, next) => {
    try {
      let list_id = ctx.params.id;
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
}