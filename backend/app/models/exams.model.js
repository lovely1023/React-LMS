module.exports = (sequelize, Sequelize) => {
  const Exams = sequelize.define("exams", {
    textbookid: {
      type: Sequelize.INTEGER
    },
    teacherid: {
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    examDate: {
      type: Sequelize.DATE
    },
    groupid: {
      type: Sequelize.INTEGER
    },
    scheduled: {
      type: Sequelize.ENUM('Y', 'N')
    },
    markingscheme: {
      type: Sequelize.INTEGER
    },
  });

  return Exams;
};