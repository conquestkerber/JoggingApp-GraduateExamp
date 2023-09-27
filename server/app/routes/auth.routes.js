module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new User with Register
  router.post("/", auth.create);

  // Retrieve all Users
  router.get("/", auth.findAll);

  // Retrieve a single User where we send email as body
  router.post("/checkUser", auth.findOne);

  // Update a User with id
  router.put("/:id", auth.update);

  // Delete a User with id
  router.delete("/:id", auth.delete);

  app.use("/api/auth", router);
};
