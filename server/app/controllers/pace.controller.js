const db = require("../models");
const Pace = db.pace;
const Op = db.Sequelize.Op;

// Create and Save a new Pace
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.pace ||
    !req.body.vo2max ||
    !req.body.tempo ||
    !req.body.intervals
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Pace
  const pace = {
    pace: req.body.pace,
    vo2max: req.body.vo2max,
    tempo: req.body.tempo,
    intervals: req.body.intervals,
  };

  // Save Pace in the database
  Pace.create(pace)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Pace.",
      });
    });
};

// Retrieve all Pace from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  //   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Pace.findAll(/* { where: condition } */)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Pace.",
      });
    });
};

// Find a single Pace with an id
exports.findOne = (req, res) => {
  const vo2 = req.params.vo2max;

  // Pace.findByPk(id)
  Pace.findByPk({ where: { vo2max: vo2 } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Pace with.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Pace",
      });
    });
};

// Update a Pace by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pace.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pace was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Pace with id=${id}. Maybe Pace was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Pace with id=" + id,
      });
    });
};

// Delete a Pace with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pace.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pace was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Pace with id=${id}. Maybe Pace was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Pace with id=" + id,
      });
    });
};

// Delete all Pace from the database.
exports.deleteAll = (req, res) => {
  Pace.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Pace were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Pace.",
      });
    });
};

// find all published Pace
exports.findAllPublished = (req, res) => {
  Pace.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Paces.",
      });
    });
};
