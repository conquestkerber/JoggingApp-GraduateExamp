module.exports = (app) => {
  const pace = require("../controllers/pace.controller");

  var router = require("express").Router();

  // Create a new pace
  router.post("/", pace.create);

  // Retrieve all pace
  router.get("/", pace.findAll);

  // Retrieve all published pace
  router.get("/published", pace.findAllPublished);

  // Retrieve a single pace with vo2max
  router.get("/:vo2max", pace.findOne);

  // Update a pace with id
  router.put("/:id", pace.update);

  // Delete a pace with id
  router.delete("/:id", pace.delete);

  // Delete all pace
  router.delete("/", pace.deleteAll);

  app.use("/api/pace", router);
};
