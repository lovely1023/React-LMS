const config = require("../config/auth.config");
const db = require("../models");
const Classes = db.classes;
const ENUM = require("../models/enum.js");
var md5 = require('md5');
var jwt = require("jsonwebtoken");
var hasher = require('wordpress-hash-node');

exports.getAll = (req, res) => {

  Classes.findAll()
    .then(data => {
      res.status(200).send({
        classes: data,
        success: true
      });
    });
};

exports.get_per_level_info = (req, res) => {
  var id = req.params.userid;
  Classes.findAll({ where: { id: id } })
    .then(data => {
      res.status(200).send({
        classes: data,
        success: true
      });
    })
    .catch(err => {
      return res.status(404).send({
        success: false
      });
    });
};