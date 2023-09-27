const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.port,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pace = require("./pace.model.js")(sequelize, Sequelize);
db.auth = require("./auth.model.js")(sequelize, Sequelize);
db.records = require("./records.model.js")(sequelize, Sequelize);
db.training = require("./training.model.js")(sequelize, Sequelize);
db.template = require("./template.model.js")(sequelize, Sequelize)

module.exports = db;
