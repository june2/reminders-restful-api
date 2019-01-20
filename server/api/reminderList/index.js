'use strict';

import Router from 'koa-router';
import reminderListCtrl from './reminderList.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', reminderListCtrl.read); // find reminderList 
api.post('/', reminderListCtrl.create); // create reminderList
api.patch('/:id', reminderListCtrl.update); // update reminderList
api.delete('/:id', reminderListCtrl.destroy); // delete reminderList

api.get('/:id/item', reminderListCtrl.readItems); // find reminderListItem 
api.post('/:id/item', reminderListCtrl.createItem); // create reminderListItem

export default api;
