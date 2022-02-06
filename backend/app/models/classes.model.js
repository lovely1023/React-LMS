module.exports = (sequelize, Sequelize) => {
  const Classes = sequelize.define("classes", {
    name: {
      type: Sequelize.STRING
    },
    examLevel: {
      type: Sequelize.ENUM('Y', 'N')
    },
  });

  return Classes;
};