module.exports = (sequelize, Sequelize) => {
  const Students = sequelize.define("students", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    IDNumber: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.BLOB
    },
    notes: {
      type: Sequelize.BLOB
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    maxHours: {
      type: Sequelize.DATE
    },
    tel: {
      type: Sequelize.STRING
    },
    tel2: {
      type: Sequelize.STRING
    },
    classid: {
      type: Sequelize.INTEGER
    },
    languageid: {
      type: Sequelize.INTEGER
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
    email: {
      type: Sequelize.STRING
    },
    usualHour: {
      type: Sequelize.TIME
    },
    price: {
      type: Sequelize.STRING
    },
    daysOfWeek: {
      type: Sequelize.BOOLEAN
    },
    howDidYouHearid: {
      type: Sequelize.INTEGER
    },
    renewals: {
      type: Sequelize.INTEGER
    },
    enrolled: {
      type: Sequelize.DATE
    },
    password: {
      type: Sequelize.STRING
    },
    libaccess: {
      type: Sequelize.STRING
    },
    libraryAccess: {
      type: Sequelize.ENUM('Y', 'N')
    },
    hwemail: {
      type: Sequelize.INTEGER
    },
    emailstatus: {
      type: Sequelize.INTEGER
    },
    pending: {
      type: Sequelize.ENUM('Y', 'N')
    },
    postcode: {
      type: Sequelize.STRING
    },
    toeicaccess: {
      type: Sequelize.ENUM('Y', 'N')
    },
    birthday: {
      type: Sequelize.DATE
    },
  });

  return Students;
};