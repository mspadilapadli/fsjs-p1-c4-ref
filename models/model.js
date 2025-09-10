const pool = require("../config");
const Factory = require("./class");
class Model {
    static async getLables(req, res) {
        try {
            const query = `select * from "Labels" order by "name" asc`;
            const data = await pool.query(query);

            return Factory.instanceLabels(data.rows);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Model;
