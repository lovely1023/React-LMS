const db = require("../models");
const Teacher = db.teacher;
const { QueryTypes, sequelize } = require('sequelize');
const Crypto = require('../config/crypt.pass');

exports.getAll1 = (req, res) => {
  Teacher.findAll()
    .then(data => {
      res.status(200).send({
        teachers: data,
        success: true
      });
    });
};


var lastday = function (y, m) {
  return new Date(y, m + 1, 0).getDate();
}

exports.getAll = async (req, res) => {
  let pagenum = req.body.pagenum;
  let limitnum = req.body.limitnum;
  let searchVal = req.body.searchVal;
  console.log('searchVal.Date--->', searchVal.Date)
  let selectedDate = searchVal.Date, startDate = '', endDate = '', name = searchVal.name, onlyActive = searchVal.onlyActive;
  let Year = 0, Month = 0, Day = 0, total_count = 0, totalQuery = "", Qeury = "", holidayCount = 0, weekCount = 0;
  Year = parseInt(selectedDate.substr(0, 4));
  Month = parseInt(selectedDate.substr(5, 2));
  Day = parseInt(selectedDate.substr(8, 2));
  startDate = Year + "-" + Month + "-1 00:00:00";
  endDate = Year + "-" + Month + "-" + lastday(Year, Month - 1) + " 00:00:00";
  let startTime = new Date(startDate).getTime();// strtotime($_POST["year"]."-".$_POST["month"]."-1 00:00:00");
  let endTime = new Date(endDate).getTime();//strtotime(date("Y-m-t", $startTime));

  let startDay = new Date(startTime).getDay(); //date("w", $startTime);
  let endDay = new Date(endTime).getDay();  //date("w", $endTime);
  if (startDay <= 3 && startDay > 1)
    weekCount++;

  while (startDay != 1) {
    startTime += 24 * 60 * 60;
    startDay = new Date(startTime).getDay(); //date("w", $startTime);
  }

  if (endDay < 3 && endDay != 0)
    weekCount--;

  while (new Date(startTime).getMonth() + 1 === new Date(startDate).getMonth() + 1) {
    startTime += 7 * 24 * 60 * 60 * 143 * 7;
    weekCount++;
  }

  await db.sequelize.query("SELECT COUNT(date) AS holidayCount FROM `holidays` WHERE DAYOFWEEK(date) != 7 AND date >= '" + startDate + "' AND date <= '" + endDate + "'", { type: QueryTypes.SELECT })
    .then(function (projects) {
      holidayCount = projects[0].holidayCount;
    })

  Qeury += "SELECT  teachers.id, teachers.status, teachers.name AS `name`, languages.name AS `language`, teacherlanguage, hoursperWeek , teachermonthdetails.extrahours, teachermonthdetails.maxhours, teachermonthdetails.bankholidays AS savedholidays ";
  Qeury += ", " + Month + " AS teachermonth, " + Year + " AS teacheryear ";
  Qeury += ", @bankHolidays := " + holidayCount + " ";
  Qeury += ", @bankholidays AS bankholidays ";
  Qeury += ", @bankhours := TRUNCATE(ROUND(@bankholidays * (teachers.hoursperweek / 5)),2) AS bankholidayhours ";
  Qeury += ", @taught := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endtime,lessons.starttime)))/(60 * 60) FROM lessons WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + startDate + "' AND lessons.lessondate <= '" + endDate + "'),0)*100)/100,2)) AS taughthours ";
  Qeury += ", @exams := (SELECT COUNT(*) FROM lessons LEFT JOIN classes ON lessons.classid = classes.id WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + startDate + "' AND lessons.lessondate <= '" + endDate + "' AND (classes.examlevel = 'Y')) AS exams ";
  Qeury += ", @saturdays := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endtime,lessons.starttime)))/(60 * 60) FROM lessons WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + startDate + "' AND lessons.lessondate <= '" + endDate + "' AND DAYOFWEEK(lessons.lessondate) = 7),0)*100)/100,2)) AS saturdays ";
  Qeury += ", @leave := (SELECT COUNT(*) FROM teacherleave WHERE leavedate >= '" + startDate + "' AND leavedate <= '" + endDate + "' AND teacherid = teachers.id) AS totalleave ";
  Qeury += ", COALESCE(teachermonthdetails.maxhours, (teachers.hoursperweek * " + weekCount + "), 0) AS expected ";
  Qeury += ", @total := (@taught + COALESCE(teachermonthdetails.extrahours,0) + TRUNCATE(ROUND(@leave * (teachers.hoursperweek / 5)),2) + COALESCE(teachermonthdetails.bankholidays, @bankhours, 0) - COALESCE(@saturdays, 0) + (@exams * 0.5)) AS totalhours ";
  Qeury += ", COALESCE(teachermonthdetails.maxhours, (teachers.hoursperweek * " + weekCount + "), 0) - @total AS hoursleft ";
  Qeury += "FROM ";
  Qeury += "teachers LEFT JOIN languages ON teachers.teacherlanguage = languages.id ";
  Qeury += "LEFT JOIN teachermonthdetails ON teachermonthdetails.teacherid = teachers.id AND MONTH(teachermonthdetails.teacherdate) = " + Month + " AND YEAR(teachermonthdetails.teacherdate) = " + Year + " ";
  Qeury += "WHERE 1=1 ";
  if (onlyActive !== false && onlyActive !== undefined)
    Qeury += "AND teachers.status=1 ";
  if (name !== '' && name !== undefined)
    Qeury += "AND teachers.name LIKE '%" + name + "%'";
  totalQuery = Qeury;
  Qeury += "ORDER BY teachers.name  LIMIT " + pagenum + ", " + limitnum;

  await db.sequelize.query(totalQuery, { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query(Qeury, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        teachers: projects,
        success: true
      });
    })
};


exports.getPerson = async (req, res) => {
  let id = req.body.id;
  let searchVal = req.body.searchVal;
  let selectedDate = searchVal.Date, startDate = '', endDate = '';
  let Year = 0, Month = 0, Day = 0, Qeury = "", holidayCount = 0, weekCount = 0;
  Year = parseInt(selectedDate.substr(0, 4));
  Month = parseInt(selectedDate.substr(5, 2));
  Day = parseInt(selectedDate.substr(8, 2));
  startDate = Year + "-" + Month + "-1 00:00:00";
  endDate = Year + "-" + Month + "-" + lastday(Year, Month - 1) + " 00:00:00";
  let startTime = new Date(startDate).getTime();
  let endTime = new Date(endDate).getTime();

  let startDay = new Date(startTime).getDay();
  let endDay = new Date(endTime).getDay();
  if (startDay <= 3 && startDay > 1)
    weekCount++;

  while (startDay != 1) {
    startTime += 24 * 60 * 60;
    startDay = new Date(startTime).getDay();
  }

  if (endDay < 3 && endDay != 0)
    weekCount--;

  while (new Date(startTime).getMonth() + 1 === new Date(startDate).getMonth() + 1) {
    startTime += 7 * 24 * 60 * 60 * 143 * 7;
    weekCount++;
  }

  let books = [];
  await db.sequelize.query("SELECT id, textbooks.`name`, textbooks.`status` FROM textbooks JOIN persontextbooks ON textbooks.id = persontextbooks.textbookid WHERE persontextbooks.personid = " + id + " AND (persontextbooks.status & 2) != 0", { type: QueryTypes.SELECT })
    .then(function (projects) {
      books = projects;
    })

  let observers = [];
  await db.sequelize.query("SELECT observations.content, observations.userid, lessons.*, users.name AS userName, teachers.name AS teacherName FROM observations LEFT JOIN lessons ON observations.id = lessons.id LEFT JOIN users ON userid = users.id LEFT JOIN teachers ON lessons.teacherid = teachers.id WHERE teachers.id = " + id + ";", { type: QueryTypes.SELECT })
    // await db.sequelize.query("SELECT observations.content, observations.userid, lessons.*, users.name AS userName, teachers.name AS teacherName FROM observations LEFT JOIN lessons ON observations.id = lessons.id LEFT JOIN users ON userid = users.id LEFT JOIN teachers ON lessons.teacherid = teachers.id WHERE teachers.id = 115;", { type: QueryTypes.SELECT })
    .then(function (projects) {
      observers = projects;
    })

  await db.sequelize.query("SELECT COUNT(date) AS holidayCount FROM `holidays` WHERE DAYOFWEEK(date) != 7 AND date >= '" + startDate + "' AND date <= '" + endDate + "'", { type: QueryTypes.SELECT })
    .then(function (projects) {
      holidayCount = projects[0].holidayCount;
    })

  Qeury += "SELECT  teachers.id, teachers.status, teachers.name AS `name`, languages.name AS `language`, teacherlanguage, hoursperWeek , teachermonthdetails.extrahours, teachermonthdetails.maxhours, teachermonthdetails.bankholidays AS savedholidays ";
  Qeury += ", " + Month + " AS teachermonth, " + Year + " AS teacheryear ";
  Qeury += ", @bankHolidays := " + holidayCount + " ";
  Qeury += ", @bankholidays AS bankholidays ";
  Qeury += ", @bankhours := TRUNCATE(ROUND(@bankholidays * (teachers.hoursperweek / 5)),2) AS bankholidayhours ";
  Qeury += ", @taught := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endtime,lessons.starttime)))/(60 * 60) FROM lessons WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + startDate + "' AND lessons.lessondate <= '" + endDate + "'),0)*100)/100,2)) AS taughthours ";
  Qeury += ", @exams := (SELECT COUNT(*) FROM lessons LEFT JOIN classes ON lessons.classid = classes.id WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + startDate + "' AND lessons.lessondate <= '" + endDate + "' AND (classes.examlevel = 'Y')) AS exams ";
  Qeury += ", @saturdays := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endtime,lessons.starttime)))/(60 * 60) FROM lessons WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + startDate + "' AND lessons.lessondate <= '" + endDate + "' AND DAYOFWEEK(lessons.lessondate) = 7),0)*100)/100,2)) AS saturdays ";
  Qeury += ", @leave := (SELECT COUNT(*) FROM teacherleave WHERE leavedate >= '" + startDate + "' AND leavedate <= '" + endDate + "' AND teacherid = teachers.id) AS totalleave ";
  Qeury += ", COALESCE(teachermonthdetails.maxhours, (teachers.hoursperweek * " + weekCount + "), 0) AS expected ";
  Qeury += ", @total := (@taught + COALESCE(teachermonthdetails.extrahours,0) + TRUNCATE(ROUND(@leave * (teachers.hoursperweek / 5)),2) + COALESCE(teachermonthdetails.bankholidays, @bankhours, 0) - COALESCE(@saturdays, 0) + (@exams * 0.5)) AS totalhours ";
  Qeury += ", COALESCE(teachermonthdetails.maxhours, (teachers.hoursperweek * " + weekCount + "), 0) - @total AS hoursleft ";

  let i = 1;
  let start = new Date(startTime).getDate();
  do {
    let end = start + 4;
    Qeury += ", '" + Year + "-" + Month + "-" + start + "' AS week" + i + "Start";
    Qeury += ", (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endtime,lessons.starttime)))/(60 * 60) FROM lessons LEFT JOIN lessoninfo ON lessoninfoid = lessoninfo.id WHERE (lessoninfo.extra = 'N' OR lessoninfo.extra is NULL) AND lessons.teacherid = teachers.id AND lessons.lessondate >= '" + Year + "-" + Month + "-" + start + "' AND lessons.lessondate <= '" + Year + "-" + Month + "-" + end + "'), 0)* 100) /100,2)) AS week" + i;
    Qeury += ", (SELECT COUNT(*) FROM lessons LEFT JOIN classes ON lessons.classid = classes.id WHERE lessons.teacherid = teachers.id AND lessons.lessondate >= '" + Year + "-" + Month + "-" + start + "' AND lessons.lessondate <= '" + Year + "-" + Month + "-" + end + "' AND (classes.examlevel = 'Y')) AS examsweek" + i;
    Qeury += ", (SELECT COUNT(*) FROM holidays WHERE date >= '" + Year + "-" + Month + "-" + start + "' AND date <= '" + Year + "-" + Month + "-" + end + "') AS holidaysweek" + i;
    Qeury += ", (SELECT COUNT(*) FROM teacherleave WHERE leavedate >= '" + Year + "-" + Month + "-" + start + "' AND leavedate <= '" + Year + "-" + Month + "-" + end + "' AND teacherid = " + id + ") as leaveweek" + i;
    start += 7;
    i++;
  }
  while (i <= weekCount);

  Qeury += " FROM ";
  Qeury += "teachers LEFT JOIN languages ON teachers.teacherlanguage = languages.id ";
  Qeury += "LEFT JOIN teachermonthdetails ON teachermonthdetails.teacherid = teachers.id AND MONTH(teachermonthdetails.teacherdate) = " + Month + " AND YEAR(teachermonthdetails.teacherdate) = " + Year + " ";
  Qeury += "WHERE teachers.id=" + id + " AND 1=1 ";

  await db.sequelize.query(Qeury, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        teacher: projects,
        books: books,
        observers: observers,
        success: true
      });
    })
};

exports.getDataForEdit = async (req, res) => {
  let id = req.params.id;

  let books = [];
  await db.sequelize.query("SELECT id, textbooks.`name`, textbooks.`status` FROM textbooks JOIN persontextbooks ON textbooks.id = persontextbooks.textbookid WHERE persontextbooks.personid = " + id + " AND (persontextbooks.status & 2) != 0", { type: QueryTypes.SELECT })
    .then(function (projects) {
      books = projects;
    })
  await db.sequelize.query("SELECT * FROM teachers WHERE id=" + id + ";", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        datas: projects,
        books: books,
        success: true
      });
    })
}

exports.update = async (req, res) => {
  let teacherid = req.body.id;
  let values = req.body.values;
  let books = req.body.books;
  let oldbooks = req.body.oldbooks;
  for (var j = 0; j < oldbooks.length; j++) {
    await db.sequelize.query("DELETE FROM `persontextbooks` WHERE textbookid='" + oldbooks[j].id + "' AND personid='" + teacherid + "';", { type: QueryTypes.DELETE })
  }

  for (var j = 0; j < books.length; j++) {
    let mark = books[j].mark;
    let status = books[j].status;
    if (books[j].mark === '' || books[j].mark === undefined)
      mark = '';
    await db.sequelize.query("INSERT INTO persontextbooks (personid, textbookid, mark, `status`, amount) VALUES (" + teacherid + ", " + books[j].id + ", '" + mark + "', 2, 1);", { type: QueryTypes.INSERT })
  }

  let status = values.isteacher ? 1 : 0;
  await db.sequelize.query("UPDATE `teachers` SET `name`='" + values.name + "', `hoursperweek`=" + values.hours + ", `password`='" + Crypto.encrypt(values.password) + "', `password2`='" + Crypto.encrypt(values.password) + "', `status`=" + status + " WHERE `id` = " + teacherid + ";", { type: QueryTypes.UPDATE })
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

exports.create = async (req, res) => {
  let teacherid = 0;
  let values = req.body.values;
  let books = req.body.books;

  await db.sequelize.query("INSERT INTO teachers (`name`, teacherLanguage, `password`, `status`, hoursPerWeek, `password2`) VALUES('" + values.name + "', @languageid := (SELECT id FROM languages WHERE `name`='English'), '" + Crypto.encrypt(values.password) + "', 1, " + values.hours + ", '" + Crypto.encrypt(values.password) + "');", { type: QueryTypes.INSERT })
    .then(reg => {
      return res.status(200).send({
        success: true
      });
    }).catch(err => {
      res.status(500).send({
        success: false
      });
    });

  await db.sequelize.query("SELECT * FROM `teachers` ORDER BY id DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      teacherid = projects[0].id;
    })

  for (var j = 0; j < books.length; j++) {
    let mark = books[j].mark;
    let status = books[j].status;
    if (books[j].mark === '' || books[j].mark === undefined)
      mark = '';
    await db.sequelize.query("INSERT INTO persontextbooks (personid, textbookid, mark, `status`, amount) VALUES (" + teacherid + ", " + books[j].id + ", '" + mark + "', 2, 1);", { type: QueryTypes.INSERT })
  }
}

exports.delete = async (req, res) => {
  var id = req.params.textbookid;
  Teacher.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teacher was deleted successfully!",
          success: true
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`,
          success: false
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Teacher with id=" + id,
        success: false
      });
    });
}