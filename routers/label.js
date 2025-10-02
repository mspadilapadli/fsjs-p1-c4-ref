const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.showLabels);
// router.get("/detail", Controller.showLabelDetail);

module.exports = router;
