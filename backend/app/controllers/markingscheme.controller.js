const db = require("../models");
const Scheme = db.schemes;

exports.getAll = (req, res) => {
  Scheme.findAll()
    .then(data => {
      res.status(200).send({
        schemes: data,
        success: true
      });
    });
};
