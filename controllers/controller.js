const Model = require("../models/model");
const View = require("../views/view");

class Controller {
    //* ==Labels==
    static async showLabels(req, res) {
        try {
            const data = await Model.getLables();
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async showSongs(req, res) {
        try {
            const data = await Model.getSongs();
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Controller;
