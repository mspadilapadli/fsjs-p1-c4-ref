const pool = require("./config");

const dataLabels = require("./data/labels.json")
    .map(({ name, since, city }) => `('${name}','${since}','${city}')`)
    .join(",\n");

const dataSongs = require("./data/songs.json")
    .map(
        ({
            title,
            bandName,
            duration,
            genre,
            createdDate,
            lyric,
            imageUrl,
            totalVote,
            LabelId,
        }) =>
            `('${title}', '${bandName}', ${duration}, '${genre}','${createdDate}','${lyric}','${imageUrl}',${totalVote},${LabelId})`
    )
    .join(",\n");

const qSeedingLabels = `insert into "Labels" ("name","since","city") values ${dataLabels}`;
const qSeedingSongs = `insert into "Songs"("title",
            "bandName",
            "duration",
            "genre",
            "createdDate",
            "lyric",
            "imageUrl",
            "totalVote",
            "labelId") 
            values ${dataSongs}`;

const seeding = async () => {
    try {
        const seedLabels = await pool.query(qSeedingLabels);
        if (seedLabels) console.log("seeding Labels successfully");

        const seedSong = await pool.query(qSeedingSongs);
        if (seedSong) console.log("seeding Songs successfully");
    } catch (error) {
        console.log(error);
    }
};

seeding();
