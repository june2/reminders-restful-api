'use strict';

import Router from 'koa-router';
import reminderListCtrl from './reminderList.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', reminderListCtrl.read); // 크립토맵 버전 정보
api.post('/', reminderListCtrl.create); // 크립토맵 버전 정보
api.patch('/:id', reminderListCtrl.update); // 크립토맵 버전 정보
api.delete('/:id', reminderListCtrl.destroy); // 크립토맵 버전 정보

export default api;
