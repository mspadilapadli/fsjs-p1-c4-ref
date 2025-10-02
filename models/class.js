//* release 1 : create class

class Label {
    constructor(id, name, since, city) {
        this.id = id;
        this.name = name;
        this.since = since;
        this.city = city;
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
                averageDuration,
                minDuration,
                maxDuration,
            }) =>
                new LabelDetailDuration(
                    id,
                    name,
                    since,
                    city,
                    averageDuration,
                    minDuration,
                    maxDuration
                )
        );
    }

    //* Songs

    static instanceSongs(arr) {
        return arr.map(
            ({ id, title, bandName, genre, totalVote }) =>
                new Song(id, title, bandName, genre, totalVote)
        );
    }
    static instanceSongDetails(arr) {
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
                lableId,
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
                    lableId
                )
        );
    }
}

module.exports = Factory;
