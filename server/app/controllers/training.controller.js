const db = require("../models");
const Training = db.training;
const Op = db.Sequelize.Op;

// Create and Save a new Training
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.template) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Training
  const trainingData = req.body;

  // Save Training in the database
  Training.create(trainingData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Training.",
      });
    });
};

//Create and Save a array of Trainings
exports.createBulk = (req, res) => {
  // Validate request
  if (!Array.isArray(req.body) || req.body.length === 0) {
    res.status(400).send({
      message: "Content can not be empty or must be an array!",
    });
    return;
  }

  // Create an array of Training objects
  const trainingData = req.body;

  // Save multiple Trainings in the database
  Training.bulkCreate(trainingData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Trainings.",
      });
    });
};

// Retrieve all Training from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  //   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Training.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Training.",
      });
    });
};

// Find a single Training with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Training.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Training with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Training with id=" + id,
      });
    });
};

// Update a Training by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Training.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Training was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Training with id=${id}. Maybe Training was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Training with id=" + id,
      });
    });
};

// Delete a Training with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Training.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Training was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Training with id=${id}. Maybe Training was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Training with id=" + id,
      });
    });
};

// Delete all Training from the database.
exports.deleteAll = (req, res) => {
  Training.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Training were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Training.",
      });
    });
};

// find all published Training
exports.findAllPublished = (req, res) => {
  Training.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Trainings.",
      });
    });
};
