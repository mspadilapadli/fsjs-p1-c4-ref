const Model = require("../models/model");
// const View = require("../views");

class Controller {
    //* ==Labels==
    static async showLabels(req, res) {
        try {
            const { q } = req.query;
            let data = await Model.getLables(q);
            res.render("labels", { data, searchAction: "/labels" }); // q to UX search
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
            const { q } = req.query;
            const data = await Model.getSongs(q);
            res.render("songs", { data, searchAction: "/songs" });
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

    //share form add & update

    static async showOneFormAddOrUpdate(req, res) {
        try {
            const { id } = req.params;
            const isUpdate = Boolean(id);
            const listLabels = await Model.getLables();

            let old = {};
            let action = "/songs/add";

            if (id) {
                const song = await Model.getSongById(id);
                song.createdDate = song.createdDate.toISOString().split("T")[0];
                old = song;
                action = `/songs/${id}/update`;
            }

            res.render("oneFormAddUpdate", {
                listLabels,
                old,
                errors: {},
                action,
                isUpdate,
            });
        } catch (error) {
            res.send(error);
        }
    }

    // static async showFormAddSong(req, res) {
    //     try {
    //         const listLabels = await Model.getLables();
    //         //old = req.body or existing input from user
    //         res.render("formAddSong", { listLabels, old: {}, errors: {} });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // }

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
                return res.render(`oneFormAddUpdate`, {
                    errors: error.errValidation || {},
                    old: req.body,
                    listLabels,
                    action: `/songs/add`,
                    isUpdate: false,
                });
            }

            res.send(err);
        }
    }

    // static async showFormUpdateSong(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const song = await Model.getSongById(id);
    //         song.createdDate = song.createdDate.toISOString().split("T")[0];
    //         const listLabels = await Model.getLables();

    //         res.render("formUpdateSong", {
    //             listLabels,
    //             old: song,
    //             errors: {},
    //         });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // }
    static async postUpdateSong(req, res) {
        const { id } = req.params;
        try {
            const payload = { ...req.body };

            await Model.updateSong(id, payload);
            // pr : add notice add data success
            res.redirect("/songs");
        } catch (error) {
            if (error.name === "ValidationError") {
                const listLabels = await Model.getLables();
                return res.render(`oneFormAddUpdate`, {
                    errors: error.errValidation || {},
                    old: req.body,
                    listLabels,
                    action: `/songs/${id}/update`,
                    isUpdate: true,
                });
            }
            res.send(error);
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

    //* create add and update in one form ( 1 getform , 1 postForm)
    // static async showOneFormAddOrUpdate(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const isUpdate = Boolean(id);
    //         const listLabels = await Model.getLables();

    //         let old = {};
    //         let action = "/songs/add";

    //         if (id) {
    //             const song = await Model.getSongById(id);
    //             song.createdDate = song.createdDate.toISOString().split("T")[0];
    //             old = song;
    //             action = `/songs/${id}/update`;
    //         }

    //         res.render("oneFormAddUpdate", {
    //             listLabels,
    //             old,
    //             errors: {},
    //             action,
    //             isUpdate,
    //         });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // }
    // static async submitOneFormAddOrUpdate(req, res) {
    //     const { id } = req.params;
    //     const action = id ? `/songs/${id}/update` : `/songs/add`;
    //     const isUpdate = Boolean(id);

    //     try {
    //         const payload = { ...req.body };

    //         if (id) {
    //             await Model.updateSong(id, payload);
    //         } else {
    //             await Model.addSong(payload);
    //         }
    //         // pr : add notice add data success
    //         res.redirect("/songs");
    //     } catch (error) {
    //         if (error.name === "ValidationError") {
    //             const listLabels = await Model.getLables();
    //             return res.render(`oneFormAddUpdate`, {
    //                 errors: error.errValidation || {},
    //                 old: req.body,
    //                 listLabels,
    //                 action,
    //                 isUpdate,
    //             });
    //         }
    //         res.send(error);
    //     }
    // }

    static async vote(req, res) {
        try {
            const { id } = req.params;
            const data = await Model.voteSong(+id);
            res.redirect(`/songs/${id}`);
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = Controller;
