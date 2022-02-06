var Base64 = require('js-base64');
const db = require("../models");
const Styles = db.styles;
const Role = db.role;
var hasher = require('wordpress-hash-node');
const Crypto = require('../config/crypt.pass');

// exports.findAll = (req, res) => {
//   Styles.find({})
//     .populate('roles')
//     .exec((err, users) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!users) {
//         return res.status(404).send({ message: "Users Not found." });
//       }

//       let result = users.map((el) => {
//         return el.toUserJson()
//       })
//       // console.log(result)
//       res.status(200).send(result);
//     });
// };

exports.createStyles = (req, res) => {
  const style = new Styles({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    count: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  Styles.findOne({
    name: style.name
  }, function (err, existing) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (existing) {
      res.status(400).send({ message: "The entered style exists." });
    } else {
      style.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send(style);
      });
    }
  })
};

// exports.userDel = (req, res) => {
//   var idVal = Base64.decode(req.params.userEmail)
//   User.deleteOne({ _id: idVal }, (err, result) => {
//     if (err)
//       return res.status(400).send({ message: err });
//     res.status(200).send({ message: "It has been deleted successfully." });
//   })
// };
