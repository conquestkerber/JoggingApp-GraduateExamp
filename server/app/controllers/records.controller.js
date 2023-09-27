const db = require("../models");
const Records = db.records;
const Op = db.Sequelize.Op;
const Template = db.template;
const Traning = db.Records;
const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");

exports.create = async (req, res) => {
  const { level, meters, vo2max, currentVo2max, weeks } = req.body;
  let userId = null;

  if (!level || !meters || !vo2max || !currentVo2max || !weeks) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  // let userId = null;
  let utorak = null;
  let templateName = `template${level}for${meters}m`;
  let isThereA = templateName.includes("A");
  let newRecords = null;

  try {
    const decoded = await jwt.verify(token, config.jwtSecret);
    const receivedData = req.body;
    console.log("Received Data:", receivedData);
    userId = decoded.userId;
    console.log("userId", userId);
    newRecords = {
      level,
      meters,
      userId,
      vo2max,
      currentVo2max,
      weeks,
    };
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const createdRecords = await Records.create(newRecords);
    console.log("isThereA", isThereA);

    if (isThereA) {
      const templateData = await Template.findAll({ where: { templateName } });
      const newData = templateData.map((item) => ({
        po: item.po,
        ut: item.ut,
        sr: item.sr,
        ce: item.ce,
        pe: item.pe,
        su: item.su,
        ne: item.ne,
        weekNumber: item.weekNumber,
        userId,
        templateName: item.templateName,
      }));

      const createdTraining = await Traning.bulkCreate(newData);
      res.send(createdTraining);
    } else {
      const templateData = await Template.findAll({ where: { templateName } });
      const newData = templateData.map((item) => {
        function strip_and_map(item) {
          if (item === "odmor") return item;
          return item.split(",").map((value) => value.trim());
        }
        const utValues = strip_and_map(item.ut);
        const ceValues = strip_and_map(item.ce);
        const suValues = strip_and_map(item.su);
        console.log("utorak", utValues);
        const distance = utValues[0].split("x");
        const odmor = utValues[2].split("odmor");
        const tempo = utValues[1].split("@");
        console.log("distance", distance);
        console.log("odmor", odmor);
        utorak = `2K@zagrevanje + ${distance[0]}x(${distance[1]}@${tempo[0]} + ${odmor[0]} @odmor) + 2K@hladjenje`;
        console.log("Utorak", utorak);
        return {
          po: item.po,
          ut: utorak,
          sr: item.sr,
          ce: item.ce,
          pe: item.pe,
          su: item.su,
          ne: item.ne,
          weekNumber: item.weekNumber,
          userId,
          templateName,
          procentage: item.procentage,
        };
      });

      const createdTraining = await Traning.bulkCreate(newData);
      res.send(createdTraining);
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Records.",
    });
  }
};

//i don't need to give me back all records,only 1 records for specific user

// Retrieve all records from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Records.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving records intensity.",
    });
  }
};

// Find a single Records with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Records.findAll({ where: { userId: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Records with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Records with id=" + id,
      });
    });
};

// Update a Records by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Records.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Records was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Records with id=${id}. Maybe Records was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Records with id=" + id,
      });
    });
};

// Delete a Records with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Records.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Records was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Records with id=${id}. Maybe Records was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Records with id=" + id,
      });
    });
};

// Delete all Records from the database.
exports.deleteAll = (req, res) => {
  Records.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Records.",
      });
    });
};

// find all published Records
exports.findAllPublished = (req, res) => {
  Records.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Records.",
      });
    });
};
