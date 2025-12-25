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

    static async getDetailLables(req, res) {
        try {
            const query = `SELECT l.id, l.name, l.city, l.since,
COALESCE(CAST(AVG(s.duration) as float), 0) as averageduration,
COALESCE(MIN(S.duration),0) as minduration,
COALESCE(MAX(S.duration),0) as maxduration
FROM "Labels" l LEFT JOIN "Songs" s 
ON s."labelId" = l.id
GROUP BY l.id, l.name, l.city , l.since
ORDER BY l.name ASC`;

            const data = await pool.query(query);
            const instanceData = Factory.instanceLabelDetailDuration(data.rows);
            return instanceData;
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
