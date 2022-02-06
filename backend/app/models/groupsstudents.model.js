module.exports = (sequelize, Sequelize) => {
  const Groupsstudents = sequelize.define("groupsstudents", {
    groupid: {
      type: Sequelize.INTEGER
    },
    studentid: {
      type: Sequelize.INTEGER
    },
  });
  Groupsstudents.removeAttribute('id');

  return Groupsstudents;
};