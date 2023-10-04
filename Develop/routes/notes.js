"strict mode";
// import npm library
const notes = require("express").Router();
const { readFile, writeFile } = require("fs/promises");
const uuid = require("../helpers/uuid");

// create path for api/notes
notes.get("/", (req, res) => {
  // read from db/db.json, readFile promise pass in path and encoding and retran data in a promise
  readFile("./db/db.json", { encoding: "utf8" })
    .then((data) => {
      if (!data) {
        data = [];
      } else {
        data;
      }
      res.json(JSON.parse(data));
    })
    .then(() => console.log("Note data retrieved!"))
    .catch((err) => console.log("Error, cannot retrive data!"));
});

// create path for api/notes for posting notes
notes.post("/", (req, res) => {
  //first read the notes from db/db.json
  let notes;
  readFile("./db/db.json", { encoding: "utf8" })
    .then((data) => {
      // add new notes to notes retrived from db.json data
      if (!data) {
        notes = [];
      } else {
        notes = JSON.parse(data);
      }

      const newNotes = req.body;
      newNotes.id = uuid();
      notes.push(newNotes);
      // update notes in the db.json file
      return writeFile("./db/db.json", JSON.stringify(notes));
    })
    .then(() => res.status(200).json(notes))
    .then(() => console.log("Note succesfully added!"))
    .catch((err) => console.error("Cannot add notes!"));
});

// create path for api/notes/id to delete notes
notes.delete("/:id", (req, res) => {
  // get the id from the url req
  const id = req.params.id;
  let notes;
  // read the notes from db.json file
  readFile("./db/db.json", { encoding: "utf8" })
    .then((data) => {
      notes = JSON.parse(data);
      // find the note with the id and take it out of the notes array
      notes.forEach((element, i) => {
        if (element.id === id) {
          notes.splice(i, 1);
        }
      });
      // update the db.json file with the new notes array
      return writeFile("./db/db.json", JSON.stringify(notes));
    })
    .then(() => {
      // return the request with status 200 code and a json object
      console.log(`Note ${id} succesfully deleted`);
      res.status(200).json(notes);
    })
    .catch((err) => console.error("Cannot delete notes!"));
});

module.exports = notes;
