const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/groupsstudents.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/groupsstudents/:userid", [authJwt.verifyToken], controller.get_per_group_ids);
  app.get("/api/pergroupsstudents/:studentid", [authJwt.verifyToken], controller.get_per_group_students);

};
