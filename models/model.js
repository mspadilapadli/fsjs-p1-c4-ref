const pool = require("../config");
const Factory = require("./class");
class Model {
    static async getLables() {
        try {
            const query = `select * from "Labels" order by "name" asc`;
            const data = await pool.query(query);
            return Factory.instanceLabels(data.rows);
        } catch (error) {
            throw error;
        }
    }

    static async getDetailLables() {
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

    static async getSongs() {
        try {
            const query = `select * from "Songs" `;
            const data = await pool.query(query);
            return Factory.instanceSongs(data.rows);
        } catch (error) {
            throw error;
        }
    }

    static async getSongById(id) {
        try {
            const query = `select * from "Songs" where "id" = ${+id}`;
            const { rows } = await pool.query(query);
            if (rows.length == 0) throw "Song not found";
            return Factory.instanceSongDetail(rows[0]);
        } catch (error) {
            throw error;
        }
    }
    static async addSong(payload) {
        try {
            const {
                title,
                bandName,
                duration,
                genre,
                createdDate,
                lyric,
                imageUrl,
                labelId,
            } = payload;
            console.log(payload);
            const query = `insert into "Songs"("title",
            "bandName",
            "duration",
            "genre",
            "createdDate",
            "lyric",
            "imageUrl",
            "totalVote",
            "labelId") 
            values ('${title}', '${bandName}','${duration}', '${genre}','${createdDate}','${lyric}','${imageUrl}','0','${labelId}'
            )`;

            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Model;
