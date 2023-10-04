"strict mode";

// import npm libraries
const express = require("express");

// import the notes route
const notesRouter = require("./notes");

// create app instance
const app = express();

// create middleware for api/notes
app.use("/notes", notesRouter);

module.exports = app;
