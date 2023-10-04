"strict mode";

// import npm libraries
const api = require("express").Router();

// import the notes route
const notesRouter = require("./notes");

// create app instance
// const app = express();

// create middleware for api/notes
api.use("/notes", notesRouter);

module.exports = api;
