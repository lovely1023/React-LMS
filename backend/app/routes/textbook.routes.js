const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/textbook.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post(
  //   "/api/textbooks/create",
  //   [
  //     verifySignUp.checkDuplicateUsernameOrEmail,
  //     verifySignUp.checkRolesExisted
  //   ],
  //   controller.create
  // );

  app.get("/api/textbooks/all", [authJwt.verifyToken], controller.getAll1);
  app.get("/api/textbooks/all/:pagenum/:limitnum", [authJwt.verifyToken], controller.getAll);
  app.get("/api/textbooks/:userid", [authJwt.verifyToken], controller.getPerson);
  app.post("/api/textbooks/teachers", [authJwt.verifyToken], controller.getPersonTeachers);
  app.post("/api/textbooks/students", [authJwt.verifyToken], controller.getPersonStudents);
  app.get("/api/textbooks/lesson/:userid", [authJwt.verifyToken], controller.getInfoForPerLesson);
  app.get("/api/textbooks/perInfo/:textbookid", [authJwt.verifyToken], controller.getPerTextbookInfo);
  app.post("/api/textbooks/search", [authJwt.verifyToken], controller.Search);
  app.delete("/api/textbooks/:textbookid", [authJwt.verifyToken], controller.delete);
  app.post("/api/textbooks/create", [authJwt.verifyToken], controller.create);
  app.put("/api/textbooks/update", [authJwt.verifyToken], controller.update);

};
