class Label {
    constructor(id, name, since, city) {
        this.id = id;
        this.name = name;
        this.since = since;
        this.city = city;
    }
}

class Song {
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
        lableId
    ) {
        this.id = id;
        this.title = title;
        this.bandName = bandName;
        this.duration = duration;
        this.genre = genre;
        this.createdDate = createdDate;
        this.lyric = lyric;
        this.imageUrl = imageUrl;
        this.totalVote = totalVote;
        this.lableId = lableId;
    }
}

class Factory {
    static instanceLabels(arr) {
        return arr.map(({ id, name, since, city }) =>
            this.instanceLabel(id, name, since, city)
        );
    }

    static instanceSongs(arr) {
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
                this.instanceSong(
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

    static instanceLabel(id, name, since, city) {
        return new Label(id, name, since, city);
    }

    static instanceSong(
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
    ) {
        return new Song(
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
        );
    }
}

module.exports = Factory;
