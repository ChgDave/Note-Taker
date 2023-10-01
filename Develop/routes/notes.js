// import npm library
const notes = require("express").Router();
const { readFile, writeFile } = require("fs/promises");

// create path for api/notes
notes.get("/", (req, res) => {
  // read from db/db.json, readFile promise pass in path and encoding and retran data in a promise
  readFile("./db/db.json", { encoding: "utf8" })
    .then((data) => res.send(JSON.parse(data)))
    .then(() => console.log("Note data retrieved!"))
    .catch((err) => console.log("Error, cannot retrive data!"));
});

notes.post("/", (req, res) => {
  //first read the notes from db/db.json
  let notes;
  readFile("./db/db.json", { encoding: "utf8" })
    .then((data) => {
      // add new notes to notes retrived from db.json data
      notes = JSON.parse(data);
      const newNotes = req.body;
      notes.push(newNotes);

      return writeFile("./db/db.json", JSON.stringify(notes));
    })
    .then(() => res.status(200).json(notes))
    .then(() => console.log("Note succesfully added!"))
    .catch((err) => console.error("Cannot add notes!"));
});

module.exports = notes;
