const express = require("express");
const cors = require("cors");
const authRoutes = require("./app/routes/auth.routes");
const paceRoutes = require("./app/routes/pace.routes");
const recordsRoutes = require("./app/routes/records.routes");
const trainingRoutes = require("./app/routes/training.routes");

const app = express();

/* var corsOptions = {
  origin: "http://localhost:8081",
}; */

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const templateRoutes = require("./app/routes/template.routes");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/auth", authRoutes);
app.use("/pace", paceRoutes);
app.use("/records", recordsRoutes);
app.use("/training", trainingRoutes);
app.use("/template", templateRoutes)

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/pace.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/records.routes")(app);
require("./app/routes/training.routes")(app);
require("./app/routes/template.routes")(app);
// require("./app/routes/achievedResults.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/* // backend/server.js

// Routes

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
 */
