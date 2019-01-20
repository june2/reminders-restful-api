'use strict';

import Router from 'koa-router';
import reminderListCtrl from './reminderList.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', reminderListCtrl.read); // find reminderList 
api.post('/', reminderListCtrl.create); // create reminderList
api.patch('/:list_id', reminderListCtrl.update); // update reminderList
api.delete('/:list_id', reminderListCtrl.destroy); // delete reminderList

api.get('/:list_id/item', reminderListCtrl.readItems); // find reminderListItem 
api.post('/:list_id/item', reminderListCtrl.createItem); // create reminderListItem
api.patch('/:list_id/item/:item_id', reminderListCtrl.updateItem); // update reminderListItem 
api.delete('/:list_id/item/:item_id', reminderListCtrl.destroyItem); // delete reminderListItem

export default api;
