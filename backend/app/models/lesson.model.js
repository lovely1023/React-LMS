module.exports = (sequelize, Sequelize) => {
  const Lessons = sequelize.define("lessons", {
    classid: {
      type: Sequelize.INTEGER
    },
    startTime: {
      type: Sequelize.TIME
    },
    endTime: {
      type: Sequelize.TIME
    },
    lessonDate: {
      type: Sequelize.DATE
    },
    languageid: {
      type: Sequelize.INTEGER
    },
    teacherid: {
      type: Sequelize.INTEGER
    },
    groupid: {
      type: Sequelize.INTEGER
    },
    lessoninfoid: {
      type: Sequelize.INTEGER
    },
  });

  return Lessons;
};