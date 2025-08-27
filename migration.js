//* import pool connection
const pool = require("./connection");

// * buat drop table
let dropTable = `drop table if exists "Songs", "Labels"`;

let queryCreateLabels = `create table if not exists "Labels" (
    "id" serial Primary key,
    "name" varchar (120) not null,
    "since" date not null, 
    "city" varchar (20) not null
)`;

let queryCreateSongs = ` create table if not exists "Songs" (
    "id" serial Primary key,
    "title" varchar (100),
    "bandName" varchar (100),
    "duration" int,
    "genre" varchar (10),
    "createdDate" date,
    "lyric" text,
    "imageUrl" varchar (150),
    "totalVote" int,
    "LabelId" int references "Labels"("id")
    )`;

async function migration() {
    try {
        let droptables = await pool.query(dropTable);
        if (droptables) console.log(`drop table success`);

        let createLabelsTable = await pool.query(queryCreateLabels);
        if (createLabelsTable) console.log(`create table labels success`);

        let createSongsTable = await pool.query(queryCreateSongs);
        if (createSongsTable) console.log(`create table songs success`);
    } catch (error) {
        console.log(error);
    }
}

migration();
