const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/classes.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/classes/all", [authJwt.verifyToken], controller.getAll);
  app.get("/api/classes/:userid", [authJwt.verifyToken], controller.get_per_level_info);

};
