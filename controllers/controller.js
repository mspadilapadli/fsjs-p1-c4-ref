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
}
module.exports = Controller;
