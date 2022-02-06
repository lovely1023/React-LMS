const db = require("../models");
const Commonitems = db.commonitems;

exports.getAll = (req, res) => {
  Commonitems.findAll()
    .then(data => {
      res.status(200).send({
        commonitems: data,
        success: true
      });
    });
};
