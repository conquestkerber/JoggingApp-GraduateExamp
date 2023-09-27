module.exports = (app) => {
  const templateIntensity = require("../controllers/template.controller");

  var router = require("express").Router();

  // Create a new templateIntensity
  router.post("/", templateIntensity.create);

  // Retrieve all template
  router.get("/all", templateIntensity.findAllTemplates);

  //  Retrieve all templateIntensity
  router.get("/:templateName", templateIntensity.findAll);

  // Create multiple templateIntensities at once (for an array of objects)
  router.post("/bulk", templateIntensity.createBulk);

  //  Retrieve a single templateIntensity with id
  // router.get("/:id", templateIntensity.findTemplateById);

  //  Update a templateIntensity with id
  router.put("/:id", templateIntensity.update);

  //  Delete a templateIntensity with id
  router.delete("/:id", templateIntensity.delete);

  // Delete all templateIntensity
  // router.delete("/", templateIntensity.deleteAll);

  app.use("/api/template", router);
};
