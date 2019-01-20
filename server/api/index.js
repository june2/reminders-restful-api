'use strict';

import Router from 'koa-router';
import reminderList from './reminderList';
import pkginfo from '~.package.json';

// 라우터 분리
const api = new Router();

let getApiInfo = ctx => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author
  };
  return ctx.res.ok({ data: data });
};

api.get('/', getApiInfo);
api.use('/reminder_list', reminderList.routes());

module.exports = api;