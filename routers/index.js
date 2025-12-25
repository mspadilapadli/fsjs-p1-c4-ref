const express = require("express");
const router = express.Router();

//*1
// const labelRouter = require("./label");
// router.use("/labels", labelRouter);

//*2
router.use("/labels", require("./label"));
router.use("/songs", require("./song"));

//test route
// router.get("/", (req, res) => {
//     res.send("router index");
// });

module.exports = router;
