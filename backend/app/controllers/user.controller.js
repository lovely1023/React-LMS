var Base64 = require('js-base64');
const db = require("../models");
const User = db.users;
const Role = db.role;
var hasher = require('wordpress-hash-node');
const Crypto = require('../config/crypt.pass');

exports.getAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.status(200).send({
        users: data,
        success: true
      });
    });
};

exports.createCustomer = (req, res) => {
  const user = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    password: Crypto.encrypt(req.body.password),
    status: req.body.status,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  User.findOne({
    email: user.email
  }, function (err, existingUser) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (existingUser) {
      //updates
      // console.log('user is updating', existingUser);
      // User.updateOne(user, { email: user.email }, function (err, updateResult) {
      //   res.status(200).send(user);
      // })
      res.status(400).send({ message: "The entered email exists." });
    } else {
      Role.findOne({ name: 'customer' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.status(200).send(user);
        });
      });
    }
  })
};

exports.userInfo = (req, res) => {
  console.log("password-------->", Crypto.encrypt("Hello"))
  // User.findOne({
  //   email: Base64.decode(req.params.userEmail)
  // })
  //   .populate('roles')
  //   .exec((err, user) => {
  //     if (err) {
  //       console.log("error---->", err)
  //       res.status(500).send({ message: err });
  //     }

  //     if (!user) {
  //       console.log("!existingUser---->")
  //       return res.status(404).send({ message: "User Not found." });
  //     }

  //     var hw = "8baa853f322c67f7f451f0c8168ba28c";
  //     console.log("password-------->", Crypto.decrypt("8baa853f322c67f7f451f0c8168ba28c"))
  //     // res.status(200).send({
  //     //   firstname: user.first_name,
  //     //   lastname: user.last_name,
  //     //   phone: user.phone,
  //     //   address: user.address,
  //     //   email: user.email,
  //     //   password: Crypto.decrypt(user.password),
  //     //   roles: user.roles
  //     // });
  //   })
};

exports.userDel = (req, res) => {
  var idVal = Base64.decode(req.params.userEmail)
  User.deleteOne({ _id: idVal }, (err, result) => {
    if (err)
      return res.status(400).send({ message: err });
    res.status(200).send({ message: "It has been deleted successfully." });
  })
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
