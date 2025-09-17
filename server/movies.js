const express = require("express");
const fs = require("fs").promises;   // use promise-based fs
const path = require("path");

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8"); // read as text
    return JSON.parse(data);                           // parse JSON
  } catch (err) {
    throw err;
  }
}

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const data = await readFile(path.join(__dirname, "movies_metadata.json"));
    return res.status(200).json(data);
  } catch (err) {
    return res.sendStatus(404); // better than res.send(404)
  }
});

route.get("/:id", async (req, res) => {
  try {
    const data = await readFile(path.join(__dirname, "movies_metadata.json"));
    const movieId = parseInt(req.params.id);
    const movie = data.find(m => m.id === movieId);

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: "Movie Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error reading file" });
  }
});

module.exports = route;
