const pool = require("../config");
const Factory = require("./class");
class Model {
    static async getLables(q) {
        try {
            let query = `select * from "Labels" `;
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

    static async getSongs(q) {
        try {
            let query = `select * from "Songs" `;
            if (q) {
                query += ` where "title" ilike '%${q}%'`;
            }
            query += `order by "totalVote" asc`;
            console.log(query);
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
            // console.log(payload);

            const errors = this.validation(payload);
            // console.log(errors);
            if (Object.keys(errors).length > 0)
                throw { name: "ValidationError", errValidation: errors };

            const query = `insert into "Songs"("title",
            "bandName",
            "duration",
            "genre",
            "createdDate",
            "lyric",
            "imageUrl",
            "totalVote",
            "labelId")
            values ('${title}', '${bandName}', '${+duration}', '${genre}','${createdDate}','${lyric}','${imageUrl}','0','${labelId}'
            )`;

            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async deleteSong(id) {
        try {
            const song = this.getSongById(id);
            let query = `delete from "Songs" where "id" = ${id}`;
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async updateSong(id, payload) {
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
            // console.log(payload);

            const errors = this.validation(payload);
            // console.log(errors);
            if (Object.keys(errors).length > 0)
                throw { name: "ValidationError", errValidation: errors };

            const query = `update "Songs" set "title" = '${title}',
            "bandName" = '${bandName}',
            "duration" = '${duration}',
            "genre" = '${genre}',
            "createdDate" = '${createdDate}',
            "lyric" = '${lyric}' ,
            "imageUrl" = '${imageUrl}',
            "labelId" = '${labelId}'    
            where "id" = '${id}'`;

            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async voteSong(id) {
        try {
            let query = `update "Songs" SET "totalVote"  = "totalVote" + 1 WHERE "id" = ${id}`;
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    }

    static validation(payload) {
        const errors = {};

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

        // title
        if (!title) {
            errors.title = "Title is required";
        } else if (title.length > 100) {
            errors.title = "Title maximum character is 100";
        }

        // band name
        if (!bandName) {
            errors.bandName = "Band Name is required";
        }

        // duration
        if (!duration) {
            errors.duration = "Duration is required";
        } else if (duration < 60) {
            errors.duration = "Minimum duration is 60 seconds";
        }

        // genre
        if (!genre) {
            errors.genre = "Genre is required";
        }

        // lyric
        if (!lyric) {
            errors.lyric = "Lyric is required";
        } else {
            const words = lyric.trim().split(/\s+/);
            if (words.length < 10) {
                errors.lyric = "Minimum word in lyric is 10";
            }
        }

        // image
        if (!imageUrl) {
            errors.imageUrl = "Image Url is required";
        } else if (imageUrl.length > 50) {
            errors.imageUrl = "Image Url name maximum character is 50";
        }

        // label
        if (!labelId) {
            errors.labelId = "Label is required";
        }

        // created date
        if (!createdDate) {
            errors.createdDate = "Create Date is required";
        } else {
            //handle maximun date
            const inputDateObj = new Date(createdDate);
            const today = new Date();
            // today.setHours(0, 0, 0, 0);

            if (inputDateObj > today) {
                errors.createdDate = "Maximum created date is today";
            }
        }

        return errors;
    }
}

module.exports = Model;
