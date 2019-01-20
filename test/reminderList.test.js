'use strict';

const supertest = require('supertest');
const moment = require('moment');
const app = require('../server/app');

describe('API reminder_list', () => {
  const request = supertest(app.listen());

  describe('POST /api/reminder_list', () => {
    it('<201> reminder_list 정보 생성', async () => {
      const res = await request
        .post('/api/reminder_list')
        .send({ name: 'TEST' })
        .expect('Content-Type', /json/)
        .expect(201);

      const data = res.body;
      const expected = ['name'];
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('GET /api/reminder_list', () => {
    it('<200> reminder_list 정보 조회', async () => {
      const res = await request
        .get('/api/reminder_list')
        .expect('Content-Type', /json/)
        .expect(200);

      const { lists } = res.body;
      const expected = ['id', 'name', 'created_at'];
      expect(Object.keys(lists[0])).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('POST /api/reminder_list/:list_id', () => {
    it('<201> reminder_list_item 정보 생성', async () => {
      const res = await request
        .post('/api/reminder_list/1/item')
        .send({ name: 'ITEM1', "remind_at": "2018-11-11" })
        .expect('Content-Type', /json/)
        .expect(201);

      const data = res.body;
      const expected = ['name'];
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('GET /api/reminder_list/:list_id', () => {
    it('<200> reminder_list_item 정보 조회', async () => {
      const res = await request
        .get('/api/reminder_list/1/item')
        .expect('Content-Type', /json/)
        .expect(200);

      const { items } = res.body;
      const expected = ['id', 'name', 'status', 'remind_at', 'created_at'];
      expect(Object.keys(items[0])).toEqual(expect.arrayContaining(expected));
    });
  });
});