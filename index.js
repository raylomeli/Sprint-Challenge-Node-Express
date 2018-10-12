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
    .catch(err => res.status(500).json({ error: "No Projects Avaiable" }));
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
    .catch(error => res.status(500).send({ error: "User Error" }));
});

server.get("/projects/:id/action", (req, res) => {
  projectDb
    .getProjectActions(req.params.id)
    .then(act => {
      if (act === 0) {
        res.status(400).json("No actions on this project");
      }
      res.status(200).json(act);
    })
    .catch(err => {
      res.status(500).json("No luck pal");
    });
});

server.get("/actions/:id", (req, res) => {
  actionDb
    .get(req.params.id)
    .then(act => {
      if (act) {
        res.status(200).json(act);
      } else {
        res.status(400).json("No actions match this Id");
      }
    })
    .catch(err => {
      res.status(500).json("Not available");
    });
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(deleteProj => {
      if (deleteProj) {
        res.status(200).json({ message: "Deleted Successfully!" });
      } else {
        res
          .status(404)
          .json({ error: `The proj with specified Id: ${id}, does not exist` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cannot remove project" });
    });
});

server.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then(deleteAction => {
      if (deleteAction) {
        res.status(200).json({ message: "Deleted Successfully!" });
      } else {
        res.status(404).json({
          error: `The action with specified Id: ${id}, does not exist`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cannot remove action" });
    });
});

const port = 8001;
server.listen(port, () => console.log(`API running on port ${port}`));
