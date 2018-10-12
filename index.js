const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const knex = require("knex");
const sqlite3 = require("sqlite3");
const actionDb = require("./data/helpers/actionModel");
const projectDb = require("./data/helpers/projectModel");

const server = express();
server.use(express.json(), cors(), helmet());

server.get("/", (req, res) => {
  res.send("<h1>Go to /projects</h1>");
});

server.get("/projects", (req, res) => {
  projectDb
    .get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => res.status(500).json({ error: "No Projects Coming :(" }));
});

server.get("/actions", (req, res) => {
  actionDb
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => res.status(500).json({ error: "Can't get actions..." }));
});

server.get("/projects/:id", (req, res) => {
  projectDb
    .getProjectActions(req.params.id)
    .then(proj => {
      if (proj === 0) {
        res.status(400).json("no projects by that id");
      }
      res.status(200).json(proj);
    })
    .catch(error => res.status(500).send({ error: "You messed up" }));
});

const port = 8001;
server.listen(port, () => console.log(`API running on port ${port}`));
