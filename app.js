// Happy coding guys
const express = require("express"); //* panggil si express nya dengan cara import experssjs nya
const app = express(); //* buat app untuk menjalankan expressnya,
const port = 3000; //* tentukan portnya, port general 3000

//set view engine
app.set("view engine", "ejs");

//get data from htlm, wajib sebelum router (ini middleware)
app.use(express.urlencoded({ extended: true }));

//middleware q for reuseble search
app.use((req, res, next) => {
    res.locals.q = req.query.q || "";
    next();
});

//use router
app.use("/", require("./routers/index"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
