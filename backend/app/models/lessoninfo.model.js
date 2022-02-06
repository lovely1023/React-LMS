module.exports = (sequelize, Sequelize) => {
  const lessoninfo = sequelize.define("lessoninfo", {
    name: {
      type: Sequelize.STRING
    },
    extra: {
      type: Sequelize.ENUM('Y', 'N')
    }
  });

  return lessoninfo;
};