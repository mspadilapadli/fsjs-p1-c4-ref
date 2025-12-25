// Happy coding guys
const express = require("express"); //* panggil si express nya dengan cara import experssjs nya
const app = express(); //* buat app untuk menjalankan expressnya,
const port = 3000; //* tentukan portnya, port general 3000

//set view engine
app.set("view engine", "ejs");

//use router
app.use("/", require("./routers/index"));

//get data from htlm
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
