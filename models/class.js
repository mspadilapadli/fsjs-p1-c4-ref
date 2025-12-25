//* release 1 : create class

class Label {
    constructor(id, name, since, city) {
        this.id = id;
        this.name = name;
        this.since = since;
        this.city = city;
    }

    get formatDate() {
        const date = new Date(this.since);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("id-ID", options);
    }
}

class LabelDetailDuration extends Label {
    constructor(
        id,
        name,
        since,
        city,
        averageDuration,
        minDuration,
        maxDuration
    ) {
        super(id, name, since, city);
        this.averageDuration = averageDuration;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;
    }
}
class Song {
    constructor(id, title, bandName, duration, genre, totalVote) {
        this.id = id;
        this.title = title;
        this.bandName = bandName;
        this.duration = duration;
        this.genre = genre;
        this.totalVote = totalVote;
    }
}

class SongDetail extends Song {
    constructor(
        id,
        title,
        bandName,
        duration,
        genre,
        createdDate,
        lyric,
        imageUrl,
        totalVote,
        labelId
    ) {
        super(id, title, bandName, duration, genre, totalVote);
        this.createdDate = createdDate;
        this.lyric = lyric;
        this.imageUrl = imageUrl;
        this.labelId = labelId;
    }
}

class Factory {
    //*Labels
    static instanceLabels(arr) {
        return arr.map(({ id, name, since, city }) =>
            this.instanceLabel(id, name, since, city)
        );
    }
    static instanceLabel(id, name, since, city) {
        return new Label(id, name, since, city);
    }

    static instanceLabelDetailDuration(arr) {
        return arr.map(
            ({
                id,
                name,
                since,
                city,
                averageduration,
                minduration,
                maxduration,
            }) =>
                new LabelDetailDuration(
                    id,
                    name,
                    since,
                    city,
                    averageduration,
                    minduration,
                    maxduration
                )
        );
    }

    //* Songs

    static instanceSongs(arr) {
        return arr.map(
            ({ id, title, bandName, duration, genre, totalVote }) =>
                new Song(id, title, bandName, duration, genre, totalVote)
        );
    }
    static instanceSongsDetail(arr) {
        return arr.map(
            ({
                id,
                title,
                bandName,
                duration,
                genre,
                createdDate,
                lyric,
                imageUrl,
                totalVote,
                labelId,
            }) =>
                new SongDetail(
                    id,
                    title,
                    bandName,
                    duration,
                    genre,
                    createdDate,
                    lyric,
                    imageUrl,
                    totalVote,
                    labelId
                )
        );
    }
    static instanceSongDetail({
        id,
        title,
        bandName,
        duration,
        genre,
        createdDate,
        lyric,
        imageUrl,
        totalVote,
        labelId,
    }) {
        return new SongDetail(
            id,
            title,
            bandName,
            duration,
            genre,
            createdDate,
            lyric,
            imageUrl,
            totalVote,
            labelId
        );
    }
}

module.exports = Factory;

//test
// const labelData = require("../data/labels.json");
// console.log(Factory.instanceLabels(labelData));
// const test = async () => {
//     try {
//         console.log(Factory.instanceLabels(require("../data/labels.json")));
//         console.log(Factory.instanceSongDetails(require("../data/songs.json")));
//     } catch (error) {
//         console.log(error);
//     }
// };

// test();
