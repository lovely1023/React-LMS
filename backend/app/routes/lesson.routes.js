const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/lesson.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/lessons/all/:pagenum/:limitnum", [authJwt.verifyToken], controller.getAll);
  app.get("/api/lessons/:lessonid/:topicsName", [authJwt.verifyToken], controller.getPerson);
  app.post("/api/lessons/search", [authJwt.verifyToken], controller.Search);
  
  app.post("/api/lessons/create", [authJwt.verifyToken], controller.create);
  app.put("/api/lessons/update", [authJwt.verifyToken], controller.update);

  app.get("/api/lessons/topics/:lessonid/:topics", [authJwt.verifyToken], controller.getInfoForPerTopics);
  app.get("/api/lessons/textbook/:lessonid/:textbook", [authJwt.verifyToken], controller.getInfoForPerLesson);
  app.get("/api/lessons/student/:lessonid/:student", [authJwt.verifyToken], controller.getInfoForStudent);
  app.delete("/api/lessons/:lessonid", [authJwt.verifyToken], controller.delete);
  app.get("/api/lessons/:studentId", [authJwt.verifyToken], controller.getAllPerson);

};
