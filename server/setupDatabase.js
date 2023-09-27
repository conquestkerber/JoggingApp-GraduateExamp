const mysql2 = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "admin",
  database: "runningDB",
  port: 4000,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Create a pool to manage the database connections
const pool = mysql2.createPool(dbConfig);

async function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin TINYINT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const insertDataQuery = `
  INSERT INTO Users (username, email, password, isAdmin,createdAt,updatedAt)
  VALUES
    ('admin', 'admin@admin.com', 'admin123', 1,NOW(),NOW())
`;

async function setupDatabase() {
  try {
    // Create the table if it doesn't exist
    await executeQuery(createTableQuery);

    // Insert initial data if needed
    await executeQuery(insertDataQuery);

    console.log("Database setup complete.");
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

// Run the setupDatabase function
setupDatabase();
