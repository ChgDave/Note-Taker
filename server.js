"strict mode";

// import npm libraries such as express, path
const express = require("express");
const path = require("path");
const api = require("./routes/index");

// define port number
const PORT = process.env.PORT || 3001;

// create app
const app = express();

// app to use express.json() and public folder as middleware
app.use(express.json());
app.use(express.static("./public"));
// app to send all requests that begin with api to index.js in the routes folder
app.use("/api", api);

// create path for default page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// create path for note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// create a path for all api
app.listen(PORT, () =>
  console.log(`APP listening at http://localhost:${PORT}`)
);
