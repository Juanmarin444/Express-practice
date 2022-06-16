const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    res.send(`The result is ${num1 + num2}!`);
});

app.get("/bmi", (req, res) => {
    res.sendFile(__dirname + "/bmiCalc.html");
});

app.post("/bmi-result", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const bmi = weight / (height * height);

    res.send(`Your BMI is ${bmi}`);
});

app.listen(3000, () => {
    console.log("Server Started on Port:3000");
});