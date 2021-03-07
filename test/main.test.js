const knex = require('knex');
const app = require('../app');
const {DATABASE_URL} = require('../src/config');

describe('task tracker endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  describe('GET /task', () => {
    context(`Given tasks`, () => {
      it(`responds with 200 and an array`, () => {
        return supertest(app)
          .get('/task')
          .expect(200)
      })
    })
  })

  describe('GET /task/:id', () => {
    context(`Given a task log`, () => {
      it(`responds 404 when task log doesn't exist`, () => {
        return supertest(app)
          .get(`/task-log/123`)
          .expect(404)
      })
    })
  })
})