const Model = require("../models/model");
// const View = require("../views");

class Controller {
    //* ==Labels==
    static async showLabels(req, res) {
        try {
            let data = await Model.getLables();
            res.render("labels", { data });
        } catch (error) {
            res.send(error);
        }
    }

    static async showLabelDetail(req, res) {
        try {
            const data = await Model.getDetailLables();
            res.render("labelDetails", { data });
        } catch (error) {
            res.send(error);
        }
    }

    static async showSongs(req, res) {
        try {
            const data = await Model.getSongs();
            res.render("songs", { data });
        } catch (error) {
            console.log(error);
        }
    }

    static async showSongById(req, res) {
        try {
            const { id } = req.params;
            const data = await Model.getSongById(id);
            res.render("songDetail", { data });
        } catch (error) {
            res.send(error);
        }
    }

    static async showFormAddSong(req, res) {
        try {
            const listLabels = await Model.getLables();
            res.render("formAddSong", { listLabels, old: {}, errors: {} });
        } catch (error) {
            res.send(error);
        }
    }

    static async postSong(req, res) {
        try {
            const {
                title,
                bandName,
                duration,
                genre,
                lyric,
                imageUrl,
                labelId,
                createdDate,
            } = req.body;
            const payload = {
                title,
                bandName,
                duration,
                genre,
                lyric,
                imageUrl,
                labelId,
                createdDate,
            };
            await Model.addSong(payload);
            // pr : add notice add data success
            res.redirect("/songs");
        } catch (error) {
            if (error.name === "ValidationError") {
                const listLabels = await Model.getLables();
                console.log(error.errValidation);
                return res.render(`formAddSong`, {
                    errors: error.errValidation,
                    old: req.body,
                    listLabels,
                });
            }

            res.send(err);
        }
    }

    static async deteleSong(req, res) {
        try {
            const { id } = req.params;
            await Model.deleteSong(+id);
            // pr : add notice del data success
            res.redirect("/songs");
        } catch (error) {
            res.send(error);
        }
    }

    static async showFormUpdateSong(req, res) {
        try {
            const { id } = req.params;
            const song = await Model.getSongById(id);
            song.createdDate = song.createdDate.toISOString().split("T")[0];
            const listLabels = await Model.getLables();

            res.render("formUpdateSong", {
                listLabels,
                old: song,
                errors: {},
            });
        } catch (error) {
            res.send(error);
        }
    }
    static async postUpdateSong(req, res) {
        try {
            const { id } = req.params;
            const {
                title,
                bandName,
                duration,
                genre,
                lyric,
                imageUrl,
                labelId,
                createdDate,
            } = req.body;
            const payload = {
                title,
                bandName,
                duration,
                genre,
                lyric,
                imageUrl,
                labelId,
                createdDate,
            };

            await Model.updateSong(id, payload);
            // pr : add notice add data success
            res.redirect("/songs");
        } catch (error) {
            if (error.name === "ValidationError") {
                const listLabels = await Model.getLables();
                return res.render(`formAddSong`, {
                    errors: error.errValidation,
                    old: req.body,
                    listLabels,
                });
            }
            res.send(error);
        }
    }
}
module.exports = Controller;
