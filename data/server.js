const express = require("express");
const port = 8000;
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

server.use(express.json());
server.use(helmet());
server.use(morgan("tiny"));
server.use(cors());

const projectRoutes = require("./Routes/projectRoutes");
const actionRoutes = require("./Routes/actionRoutes");

server.use("/project", projectRoutes);
server.use("/action", actionRoutes);

server.listen(port, () => console.log(`server running on port ${port}`));
