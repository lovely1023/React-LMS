module.exports = (sequelize, Sequelize) => {
  const Contracts = sequelize.define("contracts", {
    name: {
      type: Sequelize.STRING
    },
    hours: {
      type: Sequelize.INTEGER
    },
  });

  return Contracts;
};