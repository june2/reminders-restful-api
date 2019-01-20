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
      console.log(reminderList);
      if(null == reminderList){
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
  }
}