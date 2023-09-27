const db = require("../models");
const Template = db.template;
const Traning = db.training;
const Records = db.records;
const Pace = db.pace;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");

// Create and Save a new Template
exports.create = (req, res) => {
  // Validate request
  if (!req.body.templateName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Template
  const templateData = req.body;

  // Save Tamplete in the database
  Template.create(templateData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Template.",
      });
    });
};

//Create and Save a array of Templates
exports.createBulk = (req, res) => {
  // Validate request
  if (!Array.isArray(req.body) || req.body.length === 0) {
    res.status(400).send({
      message: "Content can not be empty or must be an array!",
    });
    return;
  }

  // Create an array of Template objects
  const templateData = req.body;

  // Save multiple Templates in the database
  Template.bulkCreate(templateData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Templates.",
      });
    });
};

exports.findAllTemplates = (req, res) => {
  Template.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Template Intensity.",
      });
    });
};

exports.findAll = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { templateName } = req.params;

  if (!token) {
    return res.status(401).json({ message: "JWT token is missing" });
  }

  try {
    const decoded = await jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    const receivedData = req.body;
    console.log("Received Data:", receivedData);

    const templateData = await Template.findAll({ where: { templateName } });
    const isThereA = templateName.includes("A");

    if (isThereA) {
      return res.send(templateData);
    } else {
      const recordsData = await Records.findAll({ where: { userId } });

      if (recordsData) {
        const dataLength = recordsData.length;
        const dataForUser = recordsData[dataLength - 1];
        const userVo2Max = dataForUser.vo2max;

        const paceData = await Pace.findOne({
          where: { vo2max: userVo2Max },
        });

        if (paceData) {
          const userPace = paceData.dataValues.pace;

          const trainingData = await Traning.findAll({
            where: { userId, templateName },
          });

          const newData = trainingData.map((item) => {
            const utValues = item.ut.split("+");
            const zagrevanje = utValues[0].split("zagrevanje");
            const hladjenje = utValues[3].split("hladjenje");
            const odmor = utValues[2].split("odmor");

            const utorak = `${zagrevanje[0]}${userPace} + ${utValues[1]} + ${odmor[0]}${userPace}`;

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

          return res.send(newData);
        } else {
          return res.status(404).send({
            message: `Cannot find Pace with that vo2max.`,
          });
        }
      } else {
        return res.status(404).send({
          message: `Cannot find Records with id=${userId}.`,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Template.findAll({ where: { templateName } })
//   .then((data) => {
//     // console.log("Data",data)
//     console.log("Split", isThereA);
//     if (isThereA) {
//       res.send(data);
//     } else {
//       Records.findAll({ where: { userId } })
//         .then((data) => {
//           if (data) {
//             // res.send(data)
//             // console.log("Data from Records",data)
//             console.log("jedan");
//             const dataLength = data.length;
//             dataForUser = data[dataLength - 1];
//             // console.log("DataForUser",dataForUser);
//             let userVo2Max = dataForUser.vo2max;
//             console.log("userVo2max", userVo2Max);
//             let userPace = null;
//             let utorak = ``;
//             Pace.findOne({ where: { vo2max: userVo2Max } })
//               .then((data) => {
//                 if (data) {
//                   console.log("dva");
//                   // res.send(data);
//                   // console.log("vo2max", userVo2Max);
//                   // userPace = data;
//                   // console.log("Pace", userPace);
//                   userPace = data.dataValues.pace;
//                   console.log("Pace1", userPace);
//                 } else {
//                   res.status(404).send({
//                     message: `Cannot find Pace with that vo2max.`,
//                   });
//                 }
//               })
//               .catch((err) => {
//                 res.status(500).send({
//                   message: "Error retrieving Pace",
//                 });
//               });
//             Traning.findAll({ where: { userId, templateName } })
//               .then((data) => {
//                 // console.log("Pace2", userPace);
//                 console.log("tri");

//                 console.log("Pace2", userPace);

//                 // console.log("DataTraining",data)
//                 const newData = data.map((item) => {
//                   const utValues = item.ut.split("+");
//                   const zagrevanje = utValues[0].split("zagrevanje");
//                   const hladjenje = utValues[3].split("hladjenje");
//                   const odmor = utValues[2].split("odmor");
//                   console.log("utValues", utValues);
//                   console.log("zagrevanje", zagrevanje);
//                   console.log("hladjenje", hladjenje);
//                   console.log("odmor", odmor);

//                   // console.log("utvalue", utValues);
//                   // const distance = utValues[1].split("m");
//                   // const odmor = utValues[2].split("@");
//                   // console.log("distance", distance);
//                   // // const distance = utValues[0].split("x");
//                   // // const odmor = utValues[2].split("odmor");
//                   // // console.log("distance", distance);
//                   // // console.log("odmor", odmor);
//                   // utorak = `${utValues}${userPace} + serija:${distance[0]}m trcanje brzinom:${userPace} sa pauzom:${odmor[0]}${odmor[1]} + hladjenje:${userPace} `;
//                   utorak = `${zagrevanje[0]}${userPace} + ${utValues[1]} + ${odmor[0]}${userPace}) + ${hladjenje[0]}${userPace}`;
//                   // console.log("utorak", utorak);
//                   return {
//                     po: item.po,
//                     ut: utorak,
//                     // ut:item.ut,
//                     sr: item.sr,
//                     // ce: ceValues,
//                     ce: item.ce,
//                     pe: item.pe,
//                     // su: suValues,
//                     su: item.su,
//                     ne: item.ne,
//                     // id:item.id,
//                     weekNumber: item.weekNumber,
//                     userId: userId,
//                     templateName: templateName,
//                     procentage: item.procentage,
//                   };
//                 });

//                 res.send(newData);
//               })
//               .catch((err) => {
//                 res.status(500).send({
//                   message:
//                     err.message ||
//                     "Some error occurred while retrieving Training.",
//                 });
//               });
//             // res.send(dataForUser)
//           } else {
//             res.status(404).send({
//               message: `Cannot find Records with id=${userId}.`,
//             });
//           }
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: "Error retrieving Records with id=" + userId,
//           });
//         });
//     }
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving Template.",
//     });
//   });

// // Find a single Template with an id
// exports.findTemplateById = (req, res) => {
//   const id = req.params.id;

//   Template.findByPk(id)
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Template with id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Template with id=" + id,
//       });
//     });
// };

// // Update a Template by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Template.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Template was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Template with id=${id}. Maybe Template was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Template with id=" + id,
      });
    });
};

// // Delete a Template with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Template.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Template was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Template with id=${id}. Maybe Template was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Template with id=" + id,
      });
    });
};

// Delete all Template from the database.
exports.deleteAll = (req, res) => {
  templateName = req.params.templateName;

  if (!templateName)
    res.send({
      message: "Template was not !",
    });
  Template.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Template were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Template.",
      });
    });
};

// // find all published Template
// exports.findAllPublished = (req, res) => {
//   Template.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Templates.",
//       });
//     });
// };
