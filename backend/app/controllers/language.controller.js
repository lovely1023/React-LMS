const config = require("../config/auth.config");
const db = require("../models");
const Language = db.language;

exports.getAll = (req, res) => {
  Language.findAll()
    .then(data => {
      res.status(200).send({
        languages: data,
        success: true
      });
    });
};