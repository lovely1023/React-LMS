const config = require("../config/auth.config");
const db = require("../models");
const Textbook = db.textbook;
const { QueryTypes, sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  let pagenum = req.params.pagenum;
  let limitnum = req.params.limitnum;
  let total_count = 0;
  await db.sequelize.query("SELECT *,(SELECT SUM(amount) FROM persontextbooks WHERE persontextbooks.textbookid = textbooks.id AND (persontextbooks.status & 4) = 0) AS totalGiven FROM  textbooks WHERE status=1 ORDER BY textbooks.`id` DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query("SELECT *,(SELECT SUM(amount) FROM persontextbooks WHERE persontextbooks.textbookid = textbooks.id AND (persontextbooks.status & 4) = 0) AS totalGiven FROM  textbooks WHERE status=1 ORDER BY textbooks.`id` DESC LIMIT " + pagenum + ", " + limitnum, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        textbooks: projects,
        success: true
      });
    })
};

exports.getAll1 = async (req, res) => {
  await db.sequelize.query("SELECT *,(SELECT SUM(amount) FROM persontextbooks WHERE persontextbooks.textbookid = textbooks.id AND (persontextbooks.status & 4) = 0) AS totalGiven FROM  textbooks WHERE status=1 ORDER BY textbooks.`id` DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        textbooks: projects,
        success: true
      });
    })
};

exports.getPerson = async (req, res) => {
  var id = req.params.userid;
  await db.sequelize.query("SELECT b.id AS `id`, b.name AS name, '' AS pack, a.`givenDate` AS `date`, a.`mark` FROM persontextbooks AS a LEFT JOIN textbooks AS b ON a.`textbookid` = b.`id` WHERE a.`personid` = " + id, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        textbook: projects,
        success: true
      });
    })
};

exports.getInfoForPerLesson = async (req, res) => {
  var id = req.params.userid;
  console.log('id------------------------------>', id)
  // await db.sequelize.query("SELECT textbookdetails.* , textbooks.name AS textBookName, `from`, `to`, IF(`from`=`to`, `from`, CONCAT(`from`,'-',`to`)) AS pages FROM `textbookdetails` LEFT JOIN textbooks ON textbooks.id = textbookid LEFT JOIN pageranges ON textbookdetails.id = pageranges.lessonContentsid WHERE textbookdetails.lessonid = " + id + " ORDER BY id, `from`" + id, { type: QueryTypes.SELECT })
  //   .then(function (projects) {
  //     return res.status(200).send({
  //       textbooks: projects,
  //       success: true
  //     });
  //   })
};


exports.getPerTextbookInfo = async (req, res) => {
  var id = req.params.textbookid;
  let textbook = [], students = [], teachers = [];
  await db.sequelize.query("SELECT *,(SELECT SUM(amount) FROM persontextbooks WHERE persontextbooks.textbookid = textbooks.id AND (persontextbooks.status & 4) = 0) AS totalGiven FROM  textbooks WHERE status=1 AND textbooks.`id`=" + id + " ORDER BY textbooks.`id` DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      textbook = projects;
    })
  await db.sequelize.query("SELECT * FROM students AS a JOIN persontextbooks AS b ON a.id=b.personid WHERE b.textbookid=" + id + " AND b.`status`=1 ORDER BY `id`  ASC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      students = projects
    })
  await db.sequelize.query("SELECT * FROM teachers AS a JOIN persontextbooks AS b ON a.id=b.personid WHERE b.textbookid=" + id + " AND b.`status`=2 ORDER BY `id`  ASC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        teachers: projects,
        textbook: textbook,
        students: students,
        success: true
      });
    })
};

exports.getPersonTeachers = async (req, res) => {
  var id = req.body.id;
  var data = req.body.newdata;
  let sql = "SELECT * FROM teachers AS a JOIN persontextbooks AS b ON a.id=b.personid WHERE b.textbookid=" + id + " ";
  if (data.teachers_status)
    sql += "AND (a.status & 1) = 1 ";
  if (data.teachers_name !== '')
    sql += "AND a.name LIKE '%" + data.teachers_name + "%' ";
  sql += "AND b.`status`=2";
  await db.sequelize.query(sql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        teachers: projects,
        success: true
      });
    })
};

exports.getPersonStudents = async (req, res) => {
  var id = req.body.id;
  var data = req.body.newdata;
  let sql = "SELECT * FROM students AS a JOIN persontextbooks AS b ON a.id=b.personid WHERE b.textbookid=" + id + " ";
  if (data.students_status)
    sql += "AND (a.isActive & 1) = 1 ";
  if (data.students_name !== '')
    sql += "AND a.firstName LIKE '%" + data.students_name + "%' OR a.lastName LIKE '%" + data.students_name + "%' ";
  sql += "AND b.`status`=1";
  await db.sequelize.query(sql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        students: projects,
        success: true
      });
    })
};


exports.Search = async (req, res) => {
  let pagenum = req.body.pagenum;
  let limitnum = req.body.limitnum;
  let searchVals = req.body.searchVals;
  let total_count = 0, totalSql = '';
  let sql = "SELECT *,(SELECT SUM(amount) FROM persontextbooks WHERE persontextbooks.textbookid = textbooks.id AND (persontextbooks.status & 4) = 0) AS totalGiven FROM  textbooks WHERE status=1 ";

  if (searchVals.name !== '' && searchVals.name !== undefined)
    sql += "AND textbooks.`name` LIKE '%" + searchVals.name + "%' ";

  sql += "ORDER BY textbooks.`id` DESC";
  totalSql = sql;
  sql += " LIMIT " + pagenum + ", " + limitnum

  await db.sequelize.query(totalSql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query(sql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        textbooks: projects,
        success: true
      });
    })
};

exports.delete = async (req, res) => {
  var id = req.params.textbookid;
  Textbook.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Textbook was deleted successfully!",
          success: true
        });
      } else {
        res.send({
          message: `Cannot delete Textbook with id=${id}. Maybe Textbook was not found!`,
          success: false
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Textbook with id=" + id,
        success: false
      });
    });
}

exports.create = async (req, res) => {
  let textbookid = 0;
  let values = req.body.values;
  let students = req.body.students;

  await db.sequelize.query("INSERT INTO textbooks (`name`, stock, `status`, nearmid, nearend, midpoint) VALUES ('" + values.name + "'," + values.stock + ",1,'" + values.nearMid + "','" + values.nearEnd + "','" + values.midPoint + "');", { type: QueryTypes.INSERT })
    .then(reg => {
      return res.status(200).send({
        success: true
      });
    }).catch(err => {
      res.status(500).send({
        success: false
      });
    });

  await db.sequelize.query("SELECT * FROM `textbooks` ORDER BY id DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      textbookid = projects[0].id;
    })

  for (var j = 0; j < students.length; j++) {
    await db.sequelize.query("INSERT INTO persontextbooks (personid, textbookid, mark, `status`, amount) VALUES (" + students[j].id + ", " + textbookid + ", '', 1, 1);", { type: QueryTypes.INSERT })
  }
}

exports.update = async (req, res) => {
  let textbookid = req.body.id;
  let values = req.body.values;
  let students = req.body.students;
  let oldstudents = req.body.oldstudents;
  for (var j = 0; j < oldstudents.length; j++) {
    await db.sequelize.query("DELETE FROM `persontextbooks` WHERE textbookid='" + textbookid + "';", { type: QueryTypes.DELETE })
  }

  for (var j = 0; j < students.length; j++) {
    let mark = students[j].mark;
    let status = students[j].status;
    if (students[j].mark === '' || students[j].mark === undefined)
      mark = '';
    if (students[j].status === '' || students[j].status === undefined)
      status = 1;
    await db.sequelize.query("INSERT INTO persontextbooks (personid, textbookid, mark, `status`, amount) VALUES (" + students[j].id + ", " + textbookid + ", '" + mark + "', " + status + ", 1);", { type: QueryTypes.INSERT })
  }

  await db.sequelize.query("UPDATE `textbooks` SET `name`='" + values.name + "',`stock`='" + values.stock + "',`status`='" + values.status + "',`nearmid`='" + values.nearMid + "',`nearend`='" + values.nearEnd + "',`midpoint`='" + values.midPoint + "' WHERE `id` = " + textbookid + ";", { type: QueryTypes.UPDATE })
    .then(reg => {
      return res.status(200).send({
        success: true
      });
    }).catch(err => {
      res.status(500).send({
        success: false
      });
    });
}