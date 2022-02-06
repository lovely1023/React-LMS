const controller = require("../controllers/teacher.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/teacher/all", [authJwt.verifyToken], controller.getAll1);
  app.post("/api/teacher/all", [authJwt.verifyToken], controller.getAll);
  app.post("/api/teacher/person", [authJwt.verifyToken], controller.getPerson);
  app.get("/api/teacher/edit/:id", [authJwt.verifyToken], controller.getDataForEdit);
  app.put("/api/teacher/update", [authJwt.verifyToken], controller.update);
  app.post("/api/teacher/create", [authJwt.verifyToken], controller.create);
  app.delete("/api/teacher/:teacherid", [authJwt.verifyToken], controller.delete);

};
