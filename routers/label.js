const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is from labels routers");
});

module.exports = router;
