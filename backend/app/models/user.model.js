module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    password2: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.STRING
    },
    billsAccess: {
      type: Sequelize.ENUM('Y', 'N')
    },
    billsDelete: {
      type: Sequelize.ENUM('Y', 'N')
    },
    billsEdit: {
      type: Sequelize.ENUM('Y', 'N')
    },
    billsSearch: {
      type: Sequelize.ENUM('Y', 'N')
    },
    usersAccess: {
      type: Sequelize.ENUM('Y', 'N')
    },
    usersEdit: {
      type: Sequelize.ENUM('Y', 'N')
    },
    studentEdit: {
      type: Sequelize.ENUM('Y', 'N')
    },
    studentDelete: {
      type: Sequelize.ENUM('Y', 'N')
    },
    studentStatus: {
      type: Sequelize.ENUM('Y', 'N')
    },
    tbStock: {
      type: Sequelize.ENUM('Y', 'N')
    },
    addObs: {
      type: Sequelize.ENUM('Y', 'N')
    },
    viewAllObs: {
      type: Sequelize.ENUM('Y', 'N')
    },
    deleteObs: {
      type: Sequelize.ENUM('Y', 'N')
    }
  });

  return Auth;
};