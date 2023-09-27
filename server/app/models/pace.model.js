module.exports = (sequelize, Sequelize) => {
  const Pace = sequelize.define("Pace", {
    vo2max: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement:true,
      primaryKey:true
    },
    pace: {
      type: Sequelize.STRING,
    },
    tempo: {
      type: Sequelize.STRING,
    },
    intervals: {
      type: Sequelize.STRING,
    },
  });

  return Pace;
};
