const db = require("../models");
const Student = db.student;
const { QueryTypes, sequelize } = require('sequelize');
var md5 = require('md5');
var Blob = require('blob');
const { group, textbook, notes } = require("../models");

exports.getAll = async (req, res) => {
  let pagenum = req.params.pagenum;
  let limitnum = req.params.limitnum;
  let total_count = 0;
  await db.sequelize.query("SELECT  SQL_CALC_FOUND_ROWS  students.id, students.firstName, students.lastName, students.IDNumber, students.address, students.email, students.notes, students.startDate, students.pending, students.endDate, students.maxHours, students.tel, students.tel2, students.isActive, students.price, students.daysOfWeek, students.emailstatus, students.classid, students.libraryAccess, students.renewals, students.enrolled, howdidyouhear.name AS howdidyouhear, classes.name AS LEVEL, languages.name AS LANGUAGE, recommendations.fromid AS recommendedBy, COALESCE(CONCAT(getRecName.firstName, ' ', getRecName.lastName), '') AS recommendedName, COALESCE(recommendations.redeemed2, 'Y') AS recRed , @duedate := COALESCE((SELECT duedate FROM studentpayments WHERE studentid = students.id AND paid = 'N' ORDER BY duedate LIMIT 1), students.endDate) AS duedate , @prevdate := students.startDate AS prevdate , @totalPayments := COALESCE(NULLIF((SELECT COUNT(id) FROM studentpayments WHERE studentid = students.id),0), 1) AS totalPayments , @total := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endTime,lessons.startTime)))/(60 * 60) FROM lessons LEFT JOIN lessonsstudents ON lessons.id = lessonsstudents.lessonid WHERE lessonsstudents.studentid = students.id AND lessons.lessonDate >= @prevdate),0)*100)/100,2)) AS totalHours, (SELECT TRUNCATE(ROUND((TIME_TO_SEC(students.maxHours) - (@total * 60 * 60))/(60 * 60)* 100)/100, 2)) AS hoursLeft, DATEDIFF(@duedate, CURDATE()) AS daysLeft FROM  students LEFT JOIN classes ON classid = classes.id LEFT JOIN languages ON languageid = languages.id LEFT JOIN howdidyouhear ON howdidyouhearid = howdidyouhear.id LEFT JOIN recommendations ON recommendations.toid = students.id LEFT JOIN students AS getRecName ON getRecName.id = recommendations.fromid WHERE (1 OR 0) AND 1=1 ORDER BY id DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      total_count = projects.length;
    })

  await db.sequelize.query("SELECT  SQL_CALC_FOUND_ROWS  students.id, students.firstName, students.lastName, students.IDNumber, students.address, students.email, students.notes, students.startDate, students.pending, students.endDate, students.maxHours, students.tel, students.tel2, students.isActive, students.price, students.daysOfWeek, students.emailstatus, students.classid, students.libraryAccess, students.renewals, students.enrolled, howdidyouhear.name AS howdidyouhear, classes.name AS LEVEL, languages.name AS LANGUAGE, recommendations.fromid AS recommendedBy, COALESCE(CONCAT(getRecName.firstName, ' ', getRecName.lastName), '') AS recommendedName, COALESCE(recommendations.redeemed2, 'Y') AS recRed , @duedate := COALESCE((SELECT duedate FROM studentpayments WHERE studentid = students.id AND paid = 'N' ORDER BY duedate LIMIT 1), students.endDate) AS duedate , @prevdate := students.startDate AS prevdate , @totalPayments := COALESCE(NULLIF((SELECT COUNT(id) FROM studentpayments WHERE studentid = students.id),0), 1) AS totalPayments , @total := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endTime,lessons.startTime)))/(60 * 60) FROM lessons LEFT JOIN lessonsstudents ON lessons.id = lessonsstudents.lessonid WHERE lessonsstudents.studentid = students.id AND lessons.lessonDate >= @prevdate),0)*100)/100,2)) AS totalHours, (SELECT TRUNCATE(ROUND((TIME_TO_SEC(students.maxHours) - (@total * 60 * 60))/(60 * 60)* 100)/100, 2)) AS hoursLeft, DATEDIFF(@duedate, CURDATE()) AS daysLeft FROM  students LEFT JOIN classes ON classid = classes.id LEFT JOIN languages ON languageid = languages.id LEFT JOIN howdidyouhear ON howdidyouhearid = howdidyouhear.id LEFT JOIN recommendations ON recommendations.toid = students.id LEFT JOIN students AS getRecName ON getRecName.id = recommendations.fromid WHERE (1 OR 0) AND 1=1 ORDER BY id DESC LIMIT " + pagenum + ", " + limitnum, { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        total: total_count,
        students: projects,
        success: true
      });
    })

};

exports.Search = async (req, res) => {
  let pagenum = req.body.pagenum;
  let limitnum = req.body.limitnum;
  let searchVals = req.body.searchVals;
  let daysofweekNum = req.body.daysofweekNum;
  let total_count = 0, totalSql = '';
  let sql = "SELECT  SQL_CALC_FOUND_ROWS  students.id, students.firstName, students.lastName, students.IDNumber, students.address, students.email, students.notes, students.startDate, students.pending, students.endDate, students.maxHours, students.tel, students.tel2, students.isActive, students.price, students.daysOfWeek, students.emailstatus, students.classid, students.libraryAccess, students.renewals, students.enrolled, howdidyouhear.name AS howdidyouhear, classes.name AS LEVEL, languages.name AS LANGUAGE, recommendations.fromid AS recommendedBy, COALESCE(CONCAT(getRecName.firstName, ' ', getRecName.lastName), '') AS recommendedName, COALESCE(recommendations.redeemed2, 'Y') AS recRed , @duedate := COALESCE((SELECT duedate FROM studentpayments WHERE studentid = students.id AND paid = 'N' ORDER BY duedate LIMIT 1), students.endDate) AS duedate , @prevdate := students.startDate AS prevdate , @totalPayments := COALESCE(NULLIF((SELECT COUNT(id) FROM studentpayments WHERE studentid = students.id),0), 1) AS totalPayments , @total := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endTime,lessons.startTime)))/(60 * 60) FROM lessons LEFT JOIN lessonsstudents ON lessons.id = lessonsstudents.lessonid WHERE lessonsstudents.studentid = students.id AND lessons.lessonDate >= @prevdate),0)*100)/100,2)) AS totalHours, (SELECT TRUNCATE(ROUND((TIME_TO_SEC(students.maxHours) - (@total * 60 * 60))/(60 * 60)* 100)/100, 2)) AS hoursLeft, DATEDIFF(@duedate, CURDATE()) AS daysLeft FROM  students LEFT JOIN classes ON classid = classes.id LEFT JOIN languages ON languageid = languages.id LEFT JOIN howdidyouhear ON howdidyouhearid = howdidyouhear.id LEFT JOIN recommendations ON recommendations.toid = students.id LEFT JOIN students AS getRecName ON getRecName.id = recommendations.fromid ";
  if (searchVals.group !== '' && searchVals.group !== undefined)
    sql += "JOIN groupsstudents ON students.id=groupsstudents.`studentid` ";
  sql += "WHERE (1 OR 0) AND 1=1 ";
  if (searchVals.active && searchVals.active !== undefined)
    sql += "AND (students.isActive & 1) = 1 ";
  if (searchVals.inactive && searchVals.inactive !== undefined)
    sql += "AND (students.isActive & 1) = 0 ";
  if (searchVals.name !== '' && searchVals.name !== undefined)
    sql += "AND (students.firstName LIKE '%" + searchVals.name + "%' OR students.lastName LIKE '%" + searchVals.name + "%') ";
  if (searchVals.postcode !== '' && searchVals.postcode !== undefined)
    sql += "AND students.postcode LIKE '%" + searchVals.postcode + "%' ";
  if (searchVals.level !== '' && searchVals.level !== undefined)
    sql += "AND students.classid = " + searchVals.level + " ";
  if (searchVals.pending && searchVals.pending !== undefined)
    sql += "AND students.pending = 'Y' ";
  if (!searchVals.pending && searchVals.pending !== undefined)
    sql += "AND students.pending = 'N' ";
  if (searchVals.group !== '' && searchVals.group !== undefined)
    sql += "AND groupsstudents.groupid = " + searchVals.group + " ";
  if (searchVals.finished && searchVals.finished !== undefined)
    sql += "AND ((SELECT (TIME_TO_SEC(students.maxHours) - ((COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endTime,lessons.startTime)))/(60 * 60) FROM lessons LEFT JOIN lessonsstudents ON lessons.id = lessonsstudents.lessonid WHERE lessonsstudents.studentid = students.id AND lessons.lessonDate >= students.startDate),0) * 60 * 60))/(60 * 60))) <= 0 OR DATEDIFF(students.endDate, CURDATE()) <= 0) AND students.startDate <= CURDATE() ";
  if (searchVals.enrolled !== '' && searchVals.enrolled !== undefined)
    sql += "AND students.enrolled >" + searchVals.enrolled.substr(0, 10) + " ";
  if (searchVals.heard !== '' && searchVals.heard !== undefined)
    sql += "AND students.howdidyouhearid = " + searchVals.heard + " ";
  if (daysofweekNum !== 0 && daysofweekNum !== undefined)
    sql += "AND students.daysOfWeek = " + daysofweekNum + " ";
  sql += "ORDER BY id DESC";
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
        students: projects,
        success: true
      });
    })
};

exports.getPerson = async (req, res) => {
  var id = req.params.userid;
  await db.sequelize.query("SELECT  SQL_CALC_FOUND_ROWS  students.id, students.firstName, students.lastName, students.IDNumber, students.address, students.email, students.notes, students.startDate, students.pending, students.endDate, students.maxHours, students.usualHour, students.tel, students.tel2, students.isActive, students.price, students.daysOfWeek, students.emailstatus, students.classid, students.libraryAccess, students.renewals, students.enrolled, howdidyouhear.name AS howdidyouhear, classes.name AS LEVEL, languages.name AS LANGUAGE, recommendations.fromid AS recommendedBy, COALESCE(CONCAT(getRecName.firstName, ' ', getRecName.lastName), '') AS recommendedName, COALESCE(recommendations.redeemed2, 'Y') AS recRed , @duedate := COALESCE((SELECT duedate FROM studentpayments WHERE studentid = students.id AND paid = 'N' ORDER BY duedate LIMIT 1), students.endDate) AS duedate , @prevdate := students.startDate AS prevdate , @totalPayments := COALESCE(NULLIF((SELECT COUNT(id) FROM studentpayments WHERE studentid = students.id),0), 1) AS totalPayments , @total := (TRUNCATE(ROUND(COALESCE((SELECT SUM(TIME_TO_SEC(TIMEDIFF(lessons.endTime,lessons.startTime)))/(60 * 60) FROM lessons LEFT JOIN lessonsstudents ON lessons.id = lessonsstudents.lessonid WHERE lessonsstudents.studentid = students.id AND lessons.lessonDate >= @prevdate),0)*100)/100,2)) AS totalHours, (SELECT TRUNCATE(ROUND((TIME_TO_SEC(students.maxHours) - (@total * 60 * 60))/(60 * 60)* 100)/100, 2)) AS hoursLeft, DATEDIFF(@duedate, CURDATE()) AS daysLeft FROM  students LEFT JOIN classes ON classid = classes.id LEFT JOIN languages ON languageid = languages.id LEFT JOIN howdidyouhear ON howdidyouhearid = howdidyouhear.id LEFT JOIN recommendations ON recommendations.toid = students.id LEFT JOIN students AS getRecName ON getRecName.id = recommendations.fromid WHERE (1 OR 0) AND 1=1 AND students.id= " + id + " ORDER BY id DESC", { type: QueryTypes.SELECT })
    .then(function (projects) {
      return res.status(200).send({
        student: projects,
        success: true
      });
    })

};

async function handleupdategroupsstudents(groupid, studentid) {
  // return 'ok';
  console.log('ok--->')
  await db.sequelize.query("INSERT INTO `groupsstudents` (`groupid`, `studentid`) VALUES ('" + groupid + "', '" + studentid + "');", { type: QueryTypes.INSERT })
    .then(function (projects) {
      return res.status(200).send({
        groupsuccess: true
      });
    })
}

exports.update = async (req, res) => {
  // console.log(req.body)
  var cymd = new Date();
  var yy = cymd.getFullYear();
  var mm = cymd.getMonth(+1);
  var dd = cymd.getDate();
  var HH = cymd.getHours();
  var MM = cymd.getMinutes();
  var SS = cymd.getSeconds();
  var ymd = yy + '-' + mm + '-' + dd;
  var ymdhms = yy + '-' + mm + '-' + dd + ' ' + HH + ':' + MM + ':' + SS;

  let userid = req.body.userId;
  let id = req.body.id;
  let values = req.body.values;
  let combovalues = req.body.combovalues;
  let daysofweekNum = req.body.daysofweekNum;
  let groups = req.body.groups;
  let oldgroups = req.body.oldgroups;
  let textbooks = req.body.textbooks;
  let oldtextbooks = req.body.oldtextbooks;
  console.log('oldgroups[0].id--->', oldgroups[0][0].id)
  const student = {
    firstName: values.firstName,
    lastName: values.lastName,
    IDNumber: values.IDNumber,
    address: values.address,
    notes: values.newnotes,
    startDate: values.startDate.substr(0, 10),
    endDate: values.endDate.substr(0, 10),
    maxHours: values.maxHours,
    tel: values.tel,
    tel2: values.tel2,
    level: combovalues.level,
    languageid: combovalues.language,
    isActive: values.renewing === "undecied" ? 3 : values.renewing === "not_renewing" ? 2 : values.renewing === "renewing" ? 4 : '',
    email: values.email,
    usualHour: null,//
    price: values.price,
    daysOfWeek: daysofweekNum,
    howdidyouhearid: combovalues.howdidyouhear,
    renewals: values.renewals,
    enrolled: values.enrolled.substr(0, 10),
    password: md5('123456'),//
    libaccess: null,
    libraryAccess: values.libraryAccess ? "Y" : "N",
    hwemail: 1,//
    emailstatus: 1,//
    pending: values.paymentpending ? "Y" : "N",
    postcode: values.postcode,
    toeicaccess: values.toeicaccess ? "Y" : "N",
    birthday: values.birthday.substr(0, 10),
  };

  let studentflag = false, messagesflag = false, notesflag = false, groupsstudentsflag = false, persontextbooksflag = false;

  if (student.notes !== '') {
    await db.sequelize.query("INSERT INTO messages SET message = '" + student.notes + "', title = 'Old Notes', userid = '" + userid + "', userType = 1, `dateTime` = '" + ymdhms + "', receiverType = 2, messageType = 0", { type: QueryTypes.INSERT })
      .then(reg => {
        messagesflag = true;
      })

    await db.sequelize.query("SELECT * FROM messages WHERE message='" + student.notes + "' AND `dateTime`='" + ymdhms + "'", { type: QueryTypes.SELECT })
      .then(function (res) {
        db.sequelize.query("INSERT INTO notes (messageid, targetTable, targetID) VALUES ('" + res[0].id + "', 'students', '" + id + "')", { type: QueryTypes.INSERT })
          .then(reg => {
            notesflag = true;
          })
      })
  }

  await db.sequelize.query("UPDATE `students` SET `firstName`='" + student.firstName + "',`lastName`='" + student.lastName + "',`IDNumber`='" + student.IDNumber + "',`address`='" + student.address + "',`notes`='" + student.notes + "',`startDate`='" + student.startDate + "',`endDate`='" + student.endDate + "',`maxHours`='" + student.maxHours + "',`tel`='" + student.tel + "',`tel2`='" + student.tel2 + "',`classid`=" + student.level + ",`languageid`=" + student.languageid + ",`isActive`='" + student.isActive + "',`email`='" + student.email + "',`usualHour`='" + student.usealHour + "',`price`='" + student.price + "',`daysOfWeek`=" + daysofweekNum + ",`renewals`='" + student.renewals + "',`enrolled`='" + student.enrolled + "',`password`='" + student.password + "',`libaccess`=" + null + ",`libraryAccess`='" + student.libraryAccess + "',`hwemail`=1,`emailstatus`=1,`pending`='" + student.pending + "',`postcode`='" + student.postcode + "',`toeicaccess`='" + student.toeicaccess + "',`birthday`='" + student.birthday + "' WHERE `id` = " + id + ";", { type: QueryTypes.UPDATE })
    .then(reg => {
      studentflag = true;
    })

  for (var j = 0; j < oldgroups.length; j++) {
    await db.sequelize.query("DELETE FROM `groupsstudents` WHERE studentid='" + id + "' AND groupid='" + oldgroups[j][0].id + "';", { type: QueryTypes.DELETE })
  }
  for (var j = 0; j < groups.length; j++) {
    await db.sequelize.query("INSERT INTO `groupsstudents` (`groupid`, `studentid`) VALUES ('" + groups[j][0].id + "', '" + id + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        groupsstudentsflag = true;
      })
  }

  for (var j = 0; j < oldtextbooks.length; j++) {
    await db.sequelize.query("DELETE FROM `persontextbooks` WHERE personid='" + id + "' AND textbookid='" + oldtextbooks[j][0].id + "';", { type: QueryTypes.DELETE })
  }
  for (var j = 0; j < textbooks.length; j++) {
    await db.sequelize.query("INSERT INTO `persontextbooks` (`personid`, `textbookid`, `mark`, `status`, `amount`, `givenDate`) VALUES ('" + id + "', '" + textbooks[j][0].id + "', '', '1', '1', '" + ymd + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        persontextbooksflag = true;
      })
  }
  if (textbooks.length === 0)
    persontextbooksflag = true;
  if (groups.length === 0)
    groupsstudentsflag = true;
    
  if (studentflag && messagesflag && notesflag && groupsstudentsflag && persontextbooksflag)
    return res.status(200).send({
      success: true
    });
  else
    res.status(500).send({
      success: false
    });
}

exports.create = async (req, res) => {
  var cymd = new Date();
  var yy = cymd.getFullYear();
  var mm = cymd.getMonth(+1);
  var dd = cymd.getDate();
  var HH = cymd.getHours();
  var MM = cymd.getMinutes();
  var SS = cymd.getSeconds();
  var ymd = yy + '-' + mm + '-' + dd;
  var ymdhms = yy + '-' + mm + '-' + dd + ' ' + HH + ':' + MM + ':' + SS;
  let userid = req.body.userId;
  let id = req.body.id;
  let values = req.body.values;
  let combovalues = req.body.combovalues;
  let daysofweekNum = req.body.daysofweekNum;
  let groups = req.body.groups;
  let oldgroups = req.body.oldgroups;
  let textbooks = req.body.textbooks;
  let oldtextbooks = req.body.oldtextbooks;

  const student = {
    firstName: values.firstName,
    lastName: values.lastName,
    IDNumber: values.IDNumber,
    address: values.address,
    notes: values.newnotes,
    startDate: values.startDate.substr(0, 10),
    endDate: values.endDate.substr(0, 10),
    maxHours: values.maxHours,
    tel: values.tel,
    tel2: values.tel2,
    level: combovalues.level,
    languageid: combovalues.language,
    isActive: values.renewing === "undecied" ? 3 : values.renewing === "not_renewing" ? 2 : values.renewing === "renewing" ? 4 : '',
    email: values.email,
    usualHour: null,//
    price: values.price,
    daysOfWeek: daysofweekNum,
    howdidyouhearid: combovalues.howdidyouhear,
    renewals: values.renewals,
    enrolled: values.enrolled.substr(0, 10),
    password: md5('123456'),//
    libaccess: null,
    libraryAccess: values.libraryAccess ? "Y" : "N",
    hwemail: 1,//
    emailstatus: 1,//
    pending: values.paymentpending ? "Y" : "N",
    postcode: values.postcode,
    toeicaccess: values.toeicaccess ? "Y" : "N",
    birthday: values.birthday.substr(0, 10),
  };

  let studentflag = false, messagesflag = false, notesflag = false, groupsstudentsflag = false, persontextbooksflag = false;

  if (student.notes !== '') {
    await db.sequelize.query("INSERT INTO `students` (`firstName`, `lastName`, `IDNumber`, `address`, `notes`, `startDate`, `endDate`, `maxHours`, `tel`, `tel2`, `classid`, `languageid`, `isActive`, `email`, `usualHour`, `price`, `daysOfWeek`, `howdidyouhearid`, `renewals`, `enrolled`, `PASSWORD`, `libaccess`, `libraryAccess`, `hwemail`, `emailstatus`, `pending`, `postcode`, `toeicaccess`, `birthday`) VALUES ('" + student.firstName + "', '" + student.lastName + "', '" + student.IDNumber + "', '" + student.address + "', '" + student.notes + "', '" + student.startDate + "', '" + student.endDate + "', '" + student.maxHours + "', '" + student.tel + "', '" + student.tel2 + "', '" + student.level + "', '" + student.languageid + "', '" + student.isActive + "', '" + student.email + "', '" + student.usualHour + "', '" + student.price + "', '" + student.daysOfWeek + "', '" + student.howdidyouhearid + "', '" + student.renewals + "', '" + student.enrolled + "', '" + student.password + "', NULL, '" + student.libraryAccess + "', '" + student.hwemail + "', '" + student.emailstatus + "', '" + student.pending + "', '" + student.postcode + "', '" + student.toeicaccess + "', '" + student.birthday + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        studentflag = true;
      })

    await db.sequelize.query("INSERT INTO messages SET message = '" + student.notes + "', title = 'Old Notes', userid = '" + userid + "', userType = 1, `dateTime` = '" + ymdhms + "', receiverType = 2, messageType = 0", { type: QueryTypes.INSERT })
      .then(reg => {
        messagesflag = true;
      })

    await db.sequelize.query("SELECT * FROM messages WHERE message='" + student.notes + "' AND `dateTime`='" + ymdhms + "'", { type: QueryTypes.SELECT })
      .then(function async(res) {
        db.sequelize.query("INSERT INTO notes (messageid, targetTable, targetID) VALUES ('" + res[0].id + "', 'students', '" + id + "')", { type: QueryTypes.INSERT })
          .then(reg => {
            notesflag = true;
          })
      })
  }

  for (var j = 0; j < oldgroups.length; j++) {
    await db.sequelize.query("DELETE FROM `groupsstudents` WHERE studentid='" + id + "' AND groupid='" + oldgroups[j].id + "';", { type: QueryTypes.DELETE })
  }
  for (var j = 0; j < groups.length; j++) {
    await db.sequelize.query("INSERT INTO `groupsstudents` (`groupid`, `studentid`) VALUES ('" + groups[j].id + "', '" + id + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        groupsstudentsflag = true;
      })
  }

  for (var j = 0; j < oldtextbooks.length; j++) {
    await db.sequelize.query("DELETE FROM `persontextbooks` WHERE personid='" + id + "' AND textbookid='" + oldtextbooks[j].id + "';", { type: QueryTypes.DELETE })
  }
  for (var j = 0; j < textbooks.length; j++) {
    await db.sequelize.query("INSERT INTO `persontextbooks` (`personid`, `textbookid`, `mark`, `status`, `amount`, `givenDate`) VALUES ('" + id + "', '" + textbooks[j].id + "', '', '1', '1', '" + ymd + "');", { type: QueryTypes.INSERT })
      .then(reg => {
        persontextbooksflag = true;
      })
  }

  if (studentflag && messagesflag && notesflag && groupsstudentsflag && persontextbooksflag)
    return res.status(200).send({
      success: true
    });
  else
    res.status(500).send({
      success: false
    });
}

exports.delete = async (req, res) => {
  var id = req.params.userid;
  Student.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
          success: true
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
          success: false
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
        success: false
      });
    });
}
