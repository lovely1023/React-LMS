const config = require("../config/auth.config");
const db = require("../models");
const Bill = db.bill;
const { QueryTypes, sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  let pagenum = req.params.pagenum;
  let limitnum = req.params.limitnum;
  let total_count = 0;
  await db.sequelize.query("SELECT bills.*, CONCAT_WS(' ', students.firstname, students.lastname) AS student, users.name AS `user`, CONCAT(IF(`type` = 32, ROUND(cents/200,2), ROUND(cents/100,2)),'€') AS price FROM `bills` LEFT JOIN students ON studentid = students.id LEFT JOIN users ON users.id = userid", { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query("SELECT bills.*, CONCAT_WS(' ', students.firstname, students.lastname) AS student, users.name AS `user`, CONCAT(IF(`type` = 32, ROUND(cents/200,2), ROUND(cents/100,2)),'€') AS price FROM `bills` LEFT JOIN students ON studentid = students.id LEFT JOIN users ON users.id = userid ORDER BY bills.id DESC LIMIT " + pagenum + ", " + limitnum, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        bills: projects,
        success: true
      });
    })
};


exports.Search = async (req, res) => {
  let pagenum = req.body.pagenum;
  let limitnum = req.body.limitnum;
  let searchVals = req.body.searchVals;
  let typeInt = req.body.typeInt;
  let total_count = 0, totalSql = '', priceSql = '', total_price = 0;
  priceSql = "SELECT CONCAT(ROUND(SUM(price)/100,2),'€') AS price FROM (SELECT IF(`type` = 32, ROUND(cents/200), ROUND(cents/100)) AS price  FROM `bills` LEFT JOIN students ON studentid = students.id LEFT JOIN users ON users.id = userid WHERE 1=1 ";
  let sql = "SELECT bills.*, CONCAT_WS(' ', students.firstname, students.lastname) AS student, users.name AS `user`, CONCAT(IF(`type` = 32, ROUND(cents/200,2), ROUND(cents/100,2)),'€') AS price FROM `bills` LEFT JOIN students ON studentid = students.id LEFT JOIN users ON users.id = userid WHERE (1 OR 0) AND 1=1 ";
  if (searchVals.startDate !== '' && searchVals.startDate !== undefined) {
    sql += "AND dtime >= '" + searchVals.startDate.substr(0, 10) + " 00:00:00' ";
    priceSql += "AND dtime >= '" + searchVals.startDate.substr(0, 10) + " 00:00:00' ";
  }
  if (searchVals.endDate !== '' && searchVals.endDate !== undefined) {
    sql += "AND dtime <= '" + searchVals.endDate.substr(0, 10) + " 23:59:59' ";
    priceSql += "AND dtime <= '" + searchVals.endDate.substr(0, 10) + " 23:59:59' ";
  }
  if (searchVals.user !== '' && searchVals.user !== undefined) {
    sql += "AND userid=" + searchVals.user + " ";
    priceSql += "AND userid=" + searchVals.user + " ";
  }
  if (typeInt !== 0 && typeInt !== undefined) {
    sql += "AND type=" + typeInt + " ";
    priceSql += "AND type=" + typeInt + " ";
  }

  priceSql += "ORDER BY dtime DESC) AS price_list";
  sql += "ORDER BY dtime DESC";
  totalSql = sql;
  sql += " LIMIT " + pagenum + ", " + limitnum

  await db.sequelize.query(priceSql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_price = projects;
    })

  await db.sequelize.query(totalSql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query(sql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        total_price: total_price,
        bills: projects,
        success: true
      });
    })
};

exports.getPerson = async (req, res) => {
  var id = req.params.id;
  await db.sequelize.query("SELECT bills.*, students.firstname AS studentFname, students.lastName AS studentLname, students.IDNumber as studentidnum, students.postcode as studentpostcode, users.name AS `user` FROM `bills` LEFT JOIN students ON studentid = students.id LEFT JOIN users ON users.id = userid WHERE (1 OR 0) AND 1=1 AND bills.id=" + id + " ORDER BY dtime DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        bill: projects,
        success: true
      });
    })

};

exports.getAllPerson = async (req, res) => {
  var id = req.params.studentId;
  await db.sequelize.query("SELECT bills.*, CONCAT_WS(' ', students.firstname, students.lastname) AS student, users.name AS `user` FROM `bills` LEFT JOIN students ON studentid = students.id LEFT JOIN users ON users.id = userid WHERE 1=1 AND studentid=" + id + " ORDER BY dtime DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        bills: projects,
        success: true
      });
    })

};