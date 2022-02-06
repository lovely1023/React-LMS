const { authJwt } = require("../middlewares");
const controller = require("../controllers/styles.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
  // app.get("/api/user/userinfo/:userEmail", [authJwt.verifyToken], controller.userInfo);
  // app.get("/api/user/:userEmail", [authJwt.verifyToken], controller.userDel);

  app.post("/api/styles/create", [authJwt.verifyToken], controller.createStyles);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isCustomer],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
