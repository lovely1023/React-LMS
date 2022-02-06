module.exports = (sequelize, Sequelize) => {
  const Groups = sequelize.define("groups", {
    name: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.TIME
    },
    endtime: {
      type: Sequelize.TIME
    },
    levelid: {
      type: Sequelize.INTEGER
    },
    teacherid: {
      type: Sequelize.INTEGER
    },
    textbookid: {
      type: Sequelize.INTEGER
    },

    unit: {
      type: Sequelize.STRING
    },
    room: {
      type: Sequelize.STRING
    },
    groupstatus: {
      type: Sequelize.INTEGER
    },
    roomid: {
      type: Sequelize.INTEGER
    },
    daysInt: {
      type: Sequelize.INTEGER
    },
  });

  return Groups;
};