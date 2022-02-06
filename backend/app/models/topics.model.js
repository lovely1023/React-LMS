module.exports = (sequelize, Sequelize) => {
  const Topics = sequelize.define("topics", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Topics;
};