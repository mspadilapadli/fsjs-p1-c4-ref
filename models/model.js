const pool = require("../config");
const Factory = require("./class");
class Model {
    static async getLables(req, res) {
        try {
            const query = `select * from "Labels" order by "name" asc`;
            const data = await pool.query(query);
            console.log(Factory.instanceLabels(data.rows));
            return Factory.instanceLabels(data.rows);
        } catch (error) {
            throw error;
        }
    }

    static async getSongs(req, res) {
        try {
            const query = `select * from "Songs" `;
            const data = await pool.query(query);
            return Factory.instanceSongs(data.rows);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Model;
