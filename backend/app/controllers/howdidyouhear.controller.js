const db = require("../models");
const Howdidyouhear = db.howdidyouhear;
const { QueryTypes, sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  await db.sequelize.query(`SELECT * FROM howdidyouhear`, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        howdidyouhears: projects,
        success: true
      });
    })
};
