module.exports = (app) => {
  const trainingIntensity = require("../controllers/training.controller");

  var router = require("express").Router();

  // Create a new trainingIntensity
  router.post("/", trainingIntensity.create);

  // Retrieve all trainingIntensity
  router.get("/", trainingIntensity.findAll);

  // Retrieve all published trainingIntensity
  router.get("/published", trainingIntensity.findAllPublished);

  // Create multiple traininIntensity at once (for an array of objects)
  router.post("/bulk", trainingIntensity.createBulk);

  // Retrieve a single trainingIntensity with id
  router.get("/:id", trainingIntensity.findOne);

  // Update a trainingIntensity with id
  router.put("/:id", trainingIntensity.update);

  // Delete a trainingIntensity with id
  router.delete("/:id", trainingIntensity.delete);

  // Delete all trainingIntensity
  router.delete("/", trainingIntensity.deleteAll);

  app.use("/api/training", router);
};
