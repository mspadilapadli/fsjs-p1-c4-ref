const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.showSongs);

//add
// router.get("/add", Controller.showFormAddSong);
router.get("/add", Controller.showOneFormAddOrUpdate); //shared form
router.post("/add", Controller.postSong);

//* create add and update in one form ( 1 getform , 1 postForm)
// router.get("/add", Controller.showOneFormAddOrUpdate);
// router.post("/add", Controller.submitOneFormAddOrUpdate);

// router.get("/:id/update", Controller.showOneFormAddOrUpdate);
// router.post("/:id/update", Controller.submitOneFormAddOrUpdate);

//update
// router.get("/:id/update", Controller.showFormUpdateSong);
router.get("/:id/update", Controller.showOneFormAddOrUpdate); //shared form
router.post("/:id/update", Controller.postUpdateSong);

//delete
router.get("/:id/delete", Controller.deteleSong);

// vote song
// router.get("/:id/vote", Controller.vote);

//show single song
router.get("/:id", Controller.showSongById);

module.exports = router;
