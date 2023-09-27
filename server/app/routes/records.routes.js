module.exports = (app) => {
  const records = require("../controllers/records.controller");

  var router = require("express").Router();

  // Create a new records
  router.post("/", records.create);

  // Retrieve all records
  router.get("/", records.findAll);

  // Retrieve all published records
  router.get("/published", records.findAllPublished);

  // Retrieve a single records with id
  router.get("/:id", records.findOne);

  //retrieve records for specific user
  // router.get('/:id',auth.findAll);

  // Update a records with id
  router.put("/:id", records.update);

  // Delete a records with id
  router.delete("/:id", records.delete);

  // Delete all records
  router.delete("/", records.deleteAll);

  app.use("/api/records", router);
};
