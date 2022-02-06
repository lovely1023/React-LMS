module.exports = (sequelize, Sequelize) => {
  const Notes = sequelize.define("notes", {
    messageid: {
      type: Sequelize.INTEGER
    },
    targetTable: {
      type: Sequelize.STRING
    },
    targetID: {
      type: Sequelize.INTEGER
    },
  });

  return Notes;
};