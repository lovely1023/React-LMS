const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/bill.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/bills/all/:pagenum/:limitnum", [authJwt.verifyToken], controller.getAll);
  app.post("/api/bills/search", [authJwt.verifyToken], controller.Search);
  app.get("/api/bills/:id", [authJwt.verifyToken], controller.getPerson);
  app.get("/api/billss/:studentId", [authJwt.verifyToken], controller.getAllPerson);
};
