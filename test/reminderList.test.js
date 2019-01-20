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

      const data = res.body;
      const expected = ['id', 'name', 'created_at'];      
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });  

});