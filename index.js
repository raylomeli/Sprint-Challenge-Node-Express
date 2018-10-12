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
  res.send("<h1>Go to /projects for more</h1>");
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

server.post("/projects", (req, res) => {
  const { name, description } = req.body;
  const newProj = { name, description };
  if (!name || !description) {
    return res
      .status(400)
      .json({ error: "Please provide a name and description." });
  }
  projectDb
    .insert(newProj)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "An error has occurred during project save" })
    );
});

server.post("/actions", (req, res) => {
  const { project_id, notes, description } = req.body;
  const newAction = { project_id, notes, description };
  actionDb
    .insert(newAction)
    .then(act => {
      if (!act) {
        return res
          .status(422)
          .send({ Error: "Cannot save without valid content" });
      }
      res.status(201).json(act);
    })
    .catch(error =>
      res.status(500).json({
        error: "an error occurred while trying to save this action"
      })
    );
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedProj = { id, name, description };
  projectDb
    .update(id, updatedProj)
    .then(proj => {
      if (proj) {
        res.status(200).json(proj);
      } else {
        res
          .status(404)
          .json({ error: `The project with id: ${id}, does not exist.` });
      }
    })
    .catch(error => {
      res.json({ error: "Cannot change project" });
    });
});

server.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const { notes, description, project_id } = req.body;
  const updatedAct = { notes, description, project_id };
  actionDb
    .update(id, updatedAct)
    .then(act => {
      if (act) {
        res.status(200).json(act);
      } else {
        res
          .status(404)
          .json({ error: `The action with id: ${id}, does not exist.` });
      }
    })
    .catch(error => {
      res.json({ error: "Cannot change action" });
    });
});

const port = 8001;
server.listen(port, () => console.log(`API running on port ${port}`));
