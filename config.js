// * import pool untuk connectifitas db
const { Pool } = require("pg");

// *biat connection from js to db
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "songLabel",
    password: "admin65",
    port: 5432,
    idleTimeoutMillis: 200,
});

//* testing connection

// async function test() {
//     try {
//         console.log(await pool.query(`select now()`));
//     } catch (error) {
//         console.log(error);
//     }
// }

// test();

module.exports = pool;
