const db = require("../models");
const Topics = db.topics;
const { QueryTypes, sequelize } = require('sequelize');

exports.getAll = (req, res) => {
  Topics.findAll()
    .then(data => {
      res.status(200).send({
        topics: data,
        success: true
      });
    });
};
