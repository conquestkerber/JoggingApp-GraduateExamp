module.exports = (sequelize, Sequelize) => {
  const Training = sequelize.define("Training", {
    procentage: {
      type: Sequelize.INTEGER,
      default: 1
    },
    po: {
      type: Sequelize.STRING,
      default: ""
    },
    ut: {
      type: Sequelize.STRING,
      default: ""
    },
    sr: {
      type: Sequelize.STRING,
      default: ""
    },
    ce: {
      type: Sequelize.STRING,
      default: ""
    },
    pe: {
      type: Sequelize.STRING,
      default: ""
    },
    su: {
      type: Sequelize.STRING,
      default: ""
    },
    ne: {
      type: Sequelize.STRING,
      default: ""
    },
    weekNumber: {
      type: Sequelize.INTEGER,
      default: 0
    },
    templateName: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the name of your User model
        key: 'id',
      },
    },
  });

  return Training;
};
