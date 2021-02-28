const app = require('./app');
const knex = require('knex');
const {PORT} = require('./src/config');

const db = knex({
    client: 'pg',
    connection: 'postgres://localhost:5432/postgres'
});

app.set('db', db);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});