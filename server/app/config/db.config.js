module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "admin",
  DB: "runningDB",
  dialect: "mysql",
  port: 4000,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  jwtSecret: "your_secret_key_for_jwt",
};

/* // backend/config.js
module.exports = {
  db: {
    database: 'your_database_name',
    username: 'your_database_username',
    password: 'your_database_password',
    host: 'localhost',
    dialect: 'mysql',
  },
  jwtSecret: 'your_secret_key_for_jwt',
}; */
