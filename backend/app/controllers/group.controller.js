const db = require("../models");
const Group = db.group;
const { QueryTypes, sequelize } = require('sequelize');


exports.getAll = async (req, res) => {
  let pagenum = req.params.pagenum;
  let limitnum = req.params.limitnum;
  let total_count = 0;
  await db.sequelize.query("SELECT groups.id, groups.teacherid, groups.roomid, groups.daysint, groups.groupstatus, groups.name, groups.time, groups.endtime, groups.unit, textbooks.midpoint AS textbookmidpoint, textbooks.nearmid AS textbooknearmid, textbooks.nearend AS textbooknearend, textbooks.id AS textbookid, textbooks.name AS textbook, rooms.name AS newroom, classes.name AS LEVEL, teachers.name AS teacher FROM groups LEFT JOIN classes ON groups.levelid = classes.id LEFT JOIN teachers ON groups.teacherid = teachers.id LEFT JOIN textbooks ON groups.textbookid = textbooks.id LEFT JOIN rooms ON groups.roomid = rooms.id", { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query("SELECT groups.id, groups.teacherid, groups.roomid, groups.daysint, groups.groupstatus, groups.name, groups.time, groups.endtime, groups.unit, textbooks.midpoint AS textbookmidpoint, textbooks.nearmid AS textbooknearmid, textbooks.nearend AS textbooknearend, textbooks.id AS textbookid, textbooks.name AS textbook, rooms.name AS newroom, classes.name AS LEVEL, teachers.name AS teacher FROM groups LEFT JOIN classes ON groups.levelid = classes.id LEFT JOIN teachers ON groups.teacherid = teachers.id LEFT JOIN textbooks ON groups.textbookid = textbooks.id LEFT JOIN rooms ON groups.roomid = rooms.id ORDER BY id DESC LIMIT " + pagenum + ", " + limitnum, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        groups: projects,
        success: true
      });
    })
};

exports.getAll1 = (req, res) => {
  Group.findAll()
    .then(data => {
      res.status(200).send({
        groups: data,
        success: true
      });
    });
};

exports.Search = async (req, res) => {
  let pagenum = req.body.pagenum;
  let limitnum = req.body.limitnum;
  let searchVals = req.body.searchVals;
  let total_count = 0, totalSql = '';
  let sql = "SELECT groups.id, groups.teacherid, groups.roomid, groups.daysint, groups.groupstatus, groups.name, groups.time, groups.endtime, groups.unit, textbooks.midpoint AS textbookmidpoint, textbooks.nearmid AS textbooknearmid, textbooks.nearend AS textbooknearend, textbooks.id AS textbookid, textbooks.name AS textbook, rooms.name AS newroom, classes.name AS LEVEL, teachers.name AS teacher FROM groups LEFT JOIN classes ON groups.levelid = classes.id LEFT JOIN teachers ON groups.teacherid = teachers.id LEFT JOIN textbooks ON groups.textbookid = textbooks.id LEFT JOIN rooms ON groups.roomid = rooms.id WHERE 1=1 ";
  if (searchVals.name !== '' && searchVals.name !== undefined)
    // sql += "AND groups.name='" + searchVals.name + "' ";
    sql += "AND groups.name LIKE '%" + searchVals.name + "%' ";

  if (searchVals.groups === false || searchVals.groups === undefined)
    sql += "AND (groups.groupstatus & 2) != 0 ";

  if (searchVals.private === false || searchVals.private === undefined)
    sql += "AND (groups.groupstatus & 2) = 0 ";

  if (searchVals.hour && searchVals.hour !== undefined)
    sql += "AND (TIME_TO_SEC( TIMEDIFF( groups.endtime, groups.time ) ) /3600 =1) ";

  if (searchVals.day && searchVals.day !== undefined)
    sql += "AND BIT_COUNT(groups.daysint) = 2 ";

  if (searchVals.friday && searchVals.friday !== undefined)
    sql += "AND groups.daysint = 16 ";

  if (searchVals.saturday && searchVals.saturday !== undefined)
    sql += "AND groups.daysint = 32 ";

  sql += "ORDER BY id DESC";
  totalSql = sql;
  sql += " LIMIT " + pagenum + ", " + limitnum;

  await db.sequelize.query(totalSql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query(sql, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        groups: projects,
        success: true
      });
    })
};

exports.getPersongroup = async (req, res) => {
  var id = req.params.groupid;
  await db.sequelize.query("SELECT groups.id, groups.teacherid, groups.roomid, groups.daysint, groups.groupstatus, groups.name, groups.time, groups.endtime, groups.unit, textbooks.midpoint AS textbookmidpoint, textbooks.nearmid AS textbooknearmid, textbooks.nearend AS textbooknearend, textbooks.id AS textbookid, textbooks.name AS textbook, rooms.name AS newroom, classes.name AS LEVEL, teachers.name AS teacher FROM groups LEFT JOIN classes ON groups.levelid = classes.id LEFT JOIN teachers ON groups.teacherid = teachers.id LEFT JOIN textbooks ON groups.textbookid = textbooks.id LEFT JOIN rooms ON groups.roomid = rooms.id WHERE groups.id=" + id + " AND 1=1 ORDER BY id", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        group: projects,
        success: true
      });
    })
};

exports.getCustomgroup = async (req, res) => {
  await db.sequelize.query("SELECT groups.id, groups.teacherid, groups.roomid, groups.daysInt, groups.groupstatus, groups.name, groups.time, groups.endTime, groups.unit, textbooks.midPoint AS textbookMidPoint, textbooks.nearMid AS textbookNearMid, textbooks.nearEnd AS textbookNearEnd,textbooks.id AS textbookid, textbooks.name AS textbook, rooms.name AS newRoom, classes.name AS LEVEL, teachers.name AS teacher FROM groupsstudents, `groups` LEFT JOIN classes ON groups.levelid = classes.id LEFT JOIN teachers ON groups.teacherid = teachers.id LEFT JOIN textbooks ON groups.textbookid = textbooks.id LEFT JOIN rooms ON groups.roomid = rooms.id", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        groups: projects,
        success: true
      });
    })
};


exports.create = async (req, res) => {
  let groupid = req.body.id;
  let combovalues = req.body.combovalues;
  let values = req.body.values;
  let students = req.body.students;
  let oldstudents = req.body.oldstudents;
  let lessonsstudentsflag = false;
  let groupstatus = req.body.groupstatus;
  let daysint = req.body.daysint;
  let total_count = 0;

  await db.sequelize.query("INSERT INTO `groups` (`name`, `time`, `endTime`, `levelid`, `teacherid`, `textbookid`, `unit`, `room`, `groupstatus`, `roomid`, `daysInt`) VALUES ('" + values.name + "', '" + values.startTime + "', '" + values.endTime + "', '" + combovalues.levelId + "', '" + combovalues.teacherId + "', '" + combovalues.textbookId + "', '" + values.unit + "', '" + combovalues.roomName + "', '" + groupstatus + "', '" + combovalues.roomId + "', '" + daysint + "');", { type: QueryTypes.INSERT })
  // .then(reg => {
  //   return res.status(200).send({
  //     success: true
  //   });
  // }).catch(err => {
  //   res.status(500).send({
  //     success: false
  //   });
  // });

  await db.sequelize.query("SELECT * FROM groups", { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects[projects.length - 1];
    })

  for (var j = 0; j < students.length; j++) {
    await db.sequelize.query("INSERT INTO `groupsstudents` (`groupid`, `studentid`) VALUES ('" + total_count.id + "', '" + students[j].id + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        lessonsstudentsflag = true;
      })
  }
}


exports.update = async (req, res) => {
  let groupid = req.body.id;
  let combovalues = req.body.combovalues;
  let values = req.body.values;
  let students = req.body.students;
  let oldstudents = req.body.oldstudents;
  let lessonsstudentsflag = false;
  let groupstatus = req.body.groupstatus;
  let daysint = req.body.daysint;

  for (var j = 0; j < oldstudents.length; j++) {
    await db.sequelize.query("DELETE FROM `groupsstudents` WHERE groupid='" + groupid + "';", { type: QueryTypes.DELETE })
  }
  for (var j = 0; j < students.length; j++) {
    await db.sequelize.query("INSERT INTO `groupsstudents` (`groupid`, `studentid`) VALUES ('" + groupid + "', '" + students[j].id + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        lessonsstudentsflag = true;
      })
  }

  await db.sequelize.query("UPDATE `groups` SET `name`='" + values.name + "',`time`='" + values.startTime + "',`endTime`='" + values.endTime + "',`levelid`='" + combovalues.levelId + "',`teacherid`='" + combovalues.teacherId + "',`textbookid`='" + combovalues.textbookId + "',`unit`='" + values.unit + "',`room`='" + combovalues.roomName + "',`groupstatus`='" + groupstatus + "',`roomid`='" + combovalues.roomId + "',`daysInt`='" + daysint + "' WHERE `id` = " + groupid + ";", { type: QueryTypes.UPDATE })
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

exports.delete = async (req, res) => {
  id = req.params.groupid;
  await db.sequelize.query("DELETE FROM `groupsstudents` WHERE groupid='" + id + "';", { type: QueryTypes.DELETE })

  await db.sequelize.query("DELETE FROM `groups` WHERE id='" + id + "';", { type: QueryTypes.DELETE })
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