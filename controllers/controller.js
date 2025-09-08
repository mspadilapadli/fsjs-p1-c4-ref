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
}
module.exports = Controller;
