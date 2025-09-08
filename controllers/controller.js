const Model = require("../models/model");
const View = require("../views/view");

class Controller {
    //!====lABELS====
    static async showLabels(req, res) {
        try {
            let data = await Model.getLabelsdata();
            res.render("labels", { data });
            // res.send(data);
        } catch (error) {
            res.send(error);
            // console.log(error);
        }
    }
    static async showLabelDetail(req, res) {
        try {
            let data = await Model.getLabelDetail();
            res.render("labelsDetail", { data });
            // res.send(data);
        } catch (error) {
            res.send(error);
            // console.log(error);
        }
    }
    static async showSongs(req, res) {
        try {
            let { search } = req.query;

            let data = await Model.getSongsdata(search);
            res.render("songs", { data });

            // res.send(data);
        } catch (error) {
            res.send(error);
            // console.log(error);
        }
    }
    static async showSongById(req, res) {
        try {
            let { id } = req.params;
            let data = await Model.getSongById(+id);
            // res.send(data);
            let dataLabels = await Model.getLabelsdata();
            res.render("songDetail", { data, dataLabels });
        } catch (error) {
            res.send(error);
            // console.log(error);
        }
    }
    static async showFormAddSong(req, res) {
        try {
            // res.send("ubah ke controller");
            // console.log(req.query);
            let { error } = req.query;
            // console.log(error);
            let dataLabels = await Model.getLabelsdata();
            res.render("formAddSong", { dataLabels, error });
            // res.send(data);
        } catch (error) {
            res.send(error);
            // console.log(error);
        }
    }
}
module.exports = Controller;
