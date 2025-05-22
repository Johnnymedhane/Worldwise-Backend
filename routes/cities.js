

const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/cities.json");

function readCities() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeCities(cities) {
  fs.writeFileSync(filePath, JSON.stringify(cities, null, 2));
}

router.get("/", (req, res) => {
  const cities = readCities();
  res.json(cities);
});

router.get("/:id", (req, res) => {
  const cities = readCities();
  const city = cities.find((c) => c.id === Number(req.params.id));
  city ? res.json(city) : res.status(404).json({ message: "Not found" });
});

router.post("/", (req, res) => {
  const cities = readCities();
  const newCity = { id: Date.now(), ...req.body };
  cities.push(newCity);
  writeCities(cities);
  res.status(201).json(newCity);
});

router.delete("/:id", (req, res) => {
  const cities = readCities().filter(c => c.id !== Number(req.params.id));
  writeCities(cities);
  res.json({ message: "Deleted" });
});

module.exports = router;
