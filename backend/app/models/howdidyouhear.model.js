module.exports = (sequelize, Sequelize) => {
  const Howdidyouhear = sequelize.define("howdidyouhear", {
    name: {
      type: Sequelize.STRING
    },

  });

  return Howdidyouhear;
};