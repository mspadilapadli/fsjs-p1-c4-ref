const { config } = require("process");
const pool = require("./connection");

let dataLabels = require("./data/labels.json")
    .map((perLabel) => {
        let { name, since, city } = perLabel;
        return `('${name}','${since}', '${city}')`;
    })
    .join(",\n");

// console.log(dataLabels);

let insertLabels = `insert into "Labels" ("name","since","city")
values ${dataLabels}`;

let dataSongs = require("./data/songs.json")
    .map((perSong) => {
        let {
            title,
            bandName,
            duration,
            genre,
            createdDate,
            lyric,
            imageUrl,
            totalVote,
            LabelId,
        } = perSong;
        return `('${title}', '${bandName}', ${duration}, '${genre}','${createdDate}','${lyric}','${imageUrl}',${totalVote},${LabelId})`;
    })
    .join(",\n");

// console.log(dataSongs);
let insertSongs = `insert into "Songs"("title",
            "bandName",
            "duration",
            "genre",
            "createdDate",
            "lyric",
            "imageUrl",
            "totalVote",
            "LabelId") 
            values ${dataSongs}`;
// console.log(insertSongs);
async function seeding() {
    try {
        let queryLabels = await pool.query(insertLabels);
        if (queryLabels) console.log(`insert data labels success`);

        let querySongs = await pool.query(insertSongs);
        if (querySongs) console.log(`insert data songs success`);
    } catch (error) {
        console.log(error);
    }
}

seeding();
