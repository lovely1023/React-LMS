module.exports = (sequelize, Sequelize) => {
  const Teachers = sequelize.define("teachers", {
    name: {
      type: Sequelize.STRING
    },
    teacherLanguage: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
    hoursPerWeek: {
      type: Sequelize.INTEGER
    },
    password2: {
      type: Sequelize.STRING
    },
  });

  return Teachers;
};