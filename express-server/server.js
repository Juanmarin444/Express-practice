const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1 style='text-align: center; color: dodgerblue;'>Hello, world!</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1 style='text-align: center; color: crimson;'>Contact me at: juanmarin444@yahoo.com</h1>")
});

app.get("/about", (req, res) => {
    res.send("<h1 style='text-align: center; color: dodgerblue;'>My name is Juan Marin, and I like learning.</h1>")
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});