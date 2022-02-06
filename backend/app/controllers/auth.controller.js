const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Role = db.role;
const ENUM = require("./../models/enum.js");
const Crypto = require('../config/crypt.pass.js');
var md5 = require('md5');
var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
var hasher = require('wordpress-hash-node');
const { decode } = require("js-base64");

exports.signup = (req, res) => {
  const user = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    password: hasher.HashPassword(req.body.password),
    // password: Crypto.encrypt(req.body.password),
    status: ENUM.USER_STATUS.ACTIVE,
    createdAt: new Date()
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });
            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: user._id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token
            });
          });
        }
      );
    } else {
      Role.findOne({ name: "customer" }, (err, role) => {
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

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          var authorities = ["ROLE_CUSTOMER"];

          res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      });
    }
  });
};

// signin start
exports.signin = (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;

  User.findAll({ where: { name: name, password2: md5(pass) } })
    .then(data => {
      var token = jwt.sign({ id: data[0].dataValues.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      if (data.length === 0) {
        return res.status(404).send({ message: "User Not found." });
      }
      else {
        var decoded = jwt.verify(token, config.secret);
        // console.log('token--->', token)
        // console.log('decoded--->', decoded.id)
        res.status(200).send({
          user: data,
          access_token: token,
          success: true
        });
      }
    })
    .catch(err => {
      return res.status(404).send({ message: "User Not found." });
    });
};
// signin end

// get profile start
exports.profile = (req, res) => {
  var decoded = jwt.verify(req.body.accessToken, config.secret);
  var id = decoded.id

  User.findAll({ where: { id: id } })
    .then(data => {
      var token = jwt.sign({ id: data[0].dataValues.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      if (data.length === 0) {
        return res.status(404).send({ message: "User Not found." });
      }
      else {
        res.status(200).send({
          user: data,
          access_token: token,
          success: true
        });
      }
    })
    .catch(err => {
      return res.status(404).send({ message: "User Not found." });
    });
};
// get profile end