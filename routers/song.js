const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.showSongs);

// //add
router.get("/add", Controller.showFormAddSong);
router.post("/add", Controller.postSong);

// //update
router.get("/:id/update", Controller.showFormUpdateSong);
router.post("/:id/update", Controller.postUpdateSong);

// //delete
router.get("/:id/delete", Controller.deteleSong);

// // vote song
// router.get("/:id/vote", Controller.vote);

// //show single song
router.get("/:id", Controller.showSongById);

module.exports = router;
