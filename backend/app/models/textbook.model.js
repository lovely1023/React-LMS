module.exports = (sequelize, Sequelize) => {
  const Textbooks = sequelize.define("textbooks", {
    name: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    nearMid: {
      type: Sequelize.STRING
    },
    nearEnd: {
      type: Sequelize.STRING
    },
    midPoint: {
      type: Sequelize.STRING
    },

  });

  return Textbooks;
};