const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.showSongs);

// //add
router.get("/add", Controller.showFormAddSong);
router.post("/add", Controller.postSong);

// //update
// router.post("/:id/edit", Controller.postUpdateSong);
// router.get("/:id/edit", Controller.showFormUpdateSong);

// //delete
router.get("/:id/delete", Controller.deteleSong);

// // vote song
// router.get("/:id/vote", Controller.vote);

// //show single song
router.get("/:id", Controller.showSongById);

module.exports = router;
