const express = require("express");
const db = require("../models");
const Auth = db.auth;
const Records = db.records;
const Op = db.Sequelize.Op;
const app = express();
const config = require("../config/db.config.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cors = require("cors");
// app.use(cors());

const router = express.Router();

// Create and Save a new Auth
exports.create = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //create a registation
  const { username, email, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // const hashedConfirmPassword = await bcrypt.hash(password, 10);

  const registration = {
    username: username,
    email: email,
    password: hashedPassword,
    // confirmPassword: hashedConfirmPassword,
  };
  console.log(req.body);
  console.log(registration);
  // save registration in db
  await Auth.create(registration)
    .then((data) => {
      res.send(data);
      // res.status(201).json({ message: "User registered successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
      // res.status(500).json({ message: "Failed to register user." });
    });
};

// Retrieve all Auth from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  /*   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
   */
  const isAdmin = false;
  var condition = isAdmin ? null : {isAdmin: {[Op.like]:false}} 
  Auth.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving auth.",
      });
    });
};

// Check authentification
exports.findOne = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    const user = await Auth.findOne({ where: { email } });

    // Compare the provided password with the hashed password
    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token,user });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Failed to login." });
  }
};

// Update a Auth by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Auth.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Auth was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Auth with id=${id}. Maybe Auth was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Auth with id=" + id,
      });
    });
};

// Delete a Auth with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Auth.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Auth was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Auth with id=${id}. Maybe Auth was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Auth with id=" + id,
      });
    });
};

/* router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Failed to login." });
  }
}); */

// module.exports = router;
