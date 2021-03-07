const app = require('../app');

describe('App', () => {
  it('GET / responds with 200 containing "TASK TRACKER API v1.1.3"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'TASK TRACKER API v1.1.3');
  });
});