module.exports = (sequelize, Sequelize) => {
  const Rooms = sequelize.define("rooms", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Rooms;
};