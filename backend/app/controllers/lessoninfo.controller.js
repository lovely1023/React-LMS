const db = require("../models");
const lessoninfo = db.lessoninfo;
const { QueryTypes, sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  await db.sequelize.query(`SELECT * FROM lessoninfo`, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        lessoninfos: projects,
        success: true
      });
    })
};
