const controller = require("../controllers/group.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/group/all/:pagenum/:limitnum", [authJwt.verifyToken], controller.getAll);
  app.get("/api/group/all", [authJwt.verifyToken], controller.getAll1);
  app.post("/api/group/search", [authJwt.verifyToken], controller.Search);
  app.get("/api/group/:groupid", [authJwt.verifyToken], controller.getPersongroup);
  app.post("/api/group/customAll", [authJwt.verifyToken], controller.getCustomgroup);
  app.post("/api/group/create", [authJwt.verifyToken], controller.create);
  app.put("/api/group/update", [authJwt.verifyToken], controller.update);
  app.delete("/api/group/:groupid", [authJwt.verifyToken], controller.delete);
};
