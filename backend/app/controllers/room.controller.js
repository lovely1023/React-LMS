const db = require("../models");
const Room = db.rooms;

exports.getAll = (req, res) => {
  Room.findAll()
    .then(data => {
      res.status(200).send({
        rooms: data,
        success: true
      });
    });
};
