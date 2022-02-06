module.exports = (sequelize, Sequelize) => {
  const Students = sequelize.define("students", {
    
    billNumber: {
      type: Sequelize.INTEGER
    },
    studentID: {
      type: Sequelize.INTEGER
    },
    billText: {
      type: Sequelize.BLOB
    },
    cents: {
      type: Sequelize.INTEGER
    },
    user: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.TINYINT(4)
    },
    dTime: {
      type: Sequelize.DATE
    },
    userID: {
      type: Sequelize.INTEGER
    }
  });

  return Students;
};