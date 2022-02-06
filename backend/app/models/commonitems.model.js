module.exports = (sequelize, Sequelize) => {
  const Commonitems = sequelize.define("commonitems", {
    itemText: {
      type: Sequelize.BLOB
    },
    discountString: {
      type: Sequelize.STRING
    },
    euros: {
      type: Sequelize.INTEGER
    },
    cents: {
      type: Sequelize.INTEGER
    },
    commonName: {
      type: Sequelize.STRING
    },
    giveLibAccess: {
      type: Sequelize.ENUM('Y', 'N')
    },
    removeLibAccess: {
      type: Sequelize.ENUM('Y', 'N')
    },
    redeemRec: {
      type: Sequelize.ENUM('Y', 'N')
    },
    recommended: {
      type: Sequelize.ENUM('Y', 'N')
    },
  });
  Commonitems.removeAttribute('id');

  return Commonitems;
};