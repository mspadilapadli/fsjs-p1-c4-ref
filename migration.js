//*  import pool connection
const pool = require("./config");

// * drop table
let qDropTable = `drop table if exists "Songs", "Labels"`;

let qCreateLabels = `create table if not exists "Labels" (
    "id" serial Primary key,
    "name" varchar (120) not null,
    "since" date not null, 
    "city" varchar (20) not null
)`;

let qCreateSongs = ` create table if not exists "Songs" (
    "id" serial Primary key,
    "title" varchar (100),
    "bandName" varchar (100),
    "duration" int,
    "genre" varchar (10),
    "createdDate" date,
    "lyric" text,
    "imageUrl" varchar (150),
    "totalVote" int,
    "labelId" int references "Labels"("id")
    )`;

const migration = async () => {
    try {
        const dropTable = await pool.query(qDropTable);
        if (dropTable) console.log("tables has been dropped");

        const createLabels = await pool.query(qCreateLabels);
        if (createLabels)
            console.log("Lables table has been created successfully");

        const createSongs = await pool.query(qCreateSongs);
        if (createSongs)
            console.log("Songs table has been created successfully");
    } catch (error) {
        console.log(error);
    }
};

migration();
