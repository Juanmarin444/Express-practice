const superheros = require("superheroes");
const villains = require("supervillains");

const hero = superheros.random();
const villain = villains.random();

console.log(`${hero} VS ${villain}`);
