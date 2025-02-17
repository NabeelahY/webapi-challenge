/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const express = require("express");

const projectRoutes = require("./projects/projectRouter");
const actionRoutes = require("./actions/actionsRouter");

const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

server.use(logger);

server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.all("*", (req, res) => {
  res.status(404).json({ message: "Incorrect Route" });
});

server.listen(5000, () => {
  console.log(`*** Server Running on http://localhost:5000 ***`);
});

module.exports = server;
