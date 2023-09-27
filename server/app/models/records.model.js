module.exports = (sequelize, Sequelize) => {
  const Records = sequelize.define("Records", {
    level: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    meters: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vo2max: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Paces", // This should match the name of your User model
        key: "vo2max",
      },
    },
    currentVo2max: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    
    weeks: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // This should match the name of your User model
        key: "id",
      },
    },
  });

  return Records;
};
