const db = require("../models");
const Notes = db.notes;
const { QueryTypes, sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  var id = req.params.userid;
  await db.sequelize.query("SELECT CONCAT(b.`dateTime`, ' ', COALESCE(b.receiverID, ''), '\n', b.title,'\n', b.message, '\n \n') as notelist FROM notes AS a JOIN messages AS b ON a.messageid=b.id WHERE a.`targetID`='" + id + "'", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        notes: projects,
        success: true
      });
    })
};
