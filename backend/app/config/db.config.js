// module.exports = {
//   HOST: "localhost",
//   PORT: 27017,
//   DB: "carla_Db"
// };

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "isteacher",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};