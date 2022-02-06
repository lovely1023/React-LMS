const controller = require("../controllers/more.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // exams
  app.post("/api/more/exams/all", [authJwt.verifyToken], controller.getAll);
  app.post("/api/more/exams/scheme/all", [authJwt.verifyToken], controller.getAllScheme);
  app.get("/api/more/exams/:examid", [authJwt.verifyToken], controller.getPerson);
  app.get("/api/more/exams/scheme/:examid", [authJwt.verifyToken], controller.getPersonscheme);
  app.put("/api/more/exams/scheme/update", [authJwt.verifyToken], controller.updatescheme);
  app.put("/api/more/exams/update", [authJwt.verifyToken], controller.update);
  app.post("/api/more/exams/create", [authJwt.verifyToken], controller.create);
  app.post("/api/more/exams/scheme/create", [authJwt.verifyToken], controller.createscheme);
  app.delete("/api/more/exams/:examid", [authJwt.verifyToken], controller.delete);
  app.delete("/api/more/exams/scheme/:examid", [authJwt.verifyToken], controller.deletescheme);

  // contracts
  app.post("/api/more/contract/all", [authJwt.verifyToken], controller.getContractAll);
  app.delete("/api/more/contract/:contractid", [authJwt.verifyToken], controller.deletecontract);
  app.get("/api/more/contract/:contractid", [authJwt.verifyToken], controller.getPersoncontract);
  app.post("/api/more/contract/create", [authJwt.verifyToken], controller.createcontract);
  app.put("/api/more/contract/update", [authJwt.verifyToken], controller.updatecontract);

  // certification
  app.post("/api/more/certification/all", [authJwt.verifyToken], controller.getCertificationAll);
  app.get("/api/more/certification/:certificateid", [authJwt.verifyToken], controller.getPersoncertification);
  app.delete("/api/more/certification/:certificateid", [authJwt.verifyToken], controller.deletecertification);
  app.put("/api/more/certification/update", [authJwt.verifyToken], controller.updatecertification);
  app.post("/api/more/certification/create", [authJwt.verifyToken], controller.postcertification);

};
