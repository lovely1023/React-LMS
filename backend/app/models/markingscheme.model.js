module.exports = (sequelize, Sequelize) => {
  const Schemes = sequelize.define("markingschemes", {
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    scheme: {
      type: Sequelize.STRING
    },
  });

  return Schemes;
};