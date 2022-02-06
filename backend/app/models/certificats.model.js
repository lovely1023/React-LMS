module.exports = (sequelize, Sequelize) => {
  const Certificates = sequelize.define("certificates", {
    studentName: {
      type: Sequelize.STRING
    },
    certNumber: {
      type: Sequelize.STRING
    },
    userid: {
      type: Sequelize.INTEGER
    },
    mins: {
      type: Sequelize.INTEGER
    },
    studentid: {
      type: Sequelize.INTEGER
    },
    issueDate: {
      type: Sequelize.DATE
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    levelid: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING
    },
    IDNumber: {
      type: Sequelize.STRING
    },
  });

  return Certificates;
};