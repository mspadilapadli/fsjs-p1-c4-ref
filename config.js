const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "admin65",
    host: "localhost",
    port: 5432,
    database: "song-label-ref",
});

// const test = async () => {
//     try {
//         console.log(await pool.query("select now()"));
//     } catch (error) {
//         console.log(error);
//     }
// };

// test();

module.exports = pool;
