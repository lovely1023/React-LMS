const config = require("../config/auth.config");
const db = require("../models");
const Groupsstudents = db.groupsstudents;
const { QueryTypes, sequelize } = require('sequelize');

exports.get_per_group_ids = (req, res) => {
  var id = req.params.userid;
  Groupsstudents.findAll({ where: { studentid: id } })
    .then(data => {
      res.status(200).send({
        groupids: data,
        success: true
      });
    })
    .catch(err => {
      return res.status(404).send({
        success: false
      });
    });
};

exports.get_per_group_students = async (req, res) => {
  var id = req.params.studentid;
  await db.sequelize.query("SELECT * FROM students JOIN groupsstudents ON students.id = groupsstudents.`studentid` WHERE `groupid` = " + id + "", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        students: projects,
        success: true
      });
    })
};