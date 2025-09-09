const express = require("express");
const router = express.Router();

router.use("/labels", require("./label"));
router.use("/songs", require("./song"));

//test route
// router.get("/", (req, res) => {
//     res.send("router index");
// });

module.exports = router;
