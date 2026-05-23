require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: false });

pool.query(`
    INSERT INTO users (phone, name)
    SELECT DISTINCT ON (phone) phone, user_name
    FROM orders
    WHERE phone NOT IN (SELECT phone FROM users)
    ON CONFLICT (phone) DO NOTHING
`).then(r => {
    console.log('Users synced:', r.rowCount, 'rows inserted');
    return pool.query('SELECT * FROM users');
}).then(r => {
    console.log('All users now:', JSON.stringify(r.rows));
    pool.end();
}).catch(e => {
    console.error(e.message);
    pool.end();
});
