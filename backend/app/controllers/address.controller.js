const db = require("../models");
const Address = db.address;

exports.save = (req, res) => {
   const address = new Address({
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  });
   console.log(address)

  Address.find({
    zip_code: address.zip_code,
    street1: address.street1,
    street2: address.street2,
    city: address.city,
    state: address.state,
    country: address.country
  }, function(err, addresses) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (addresses && addresses.length > 0) {
        return res.status(400).send({ message: "Address already exists." });
    } else {
      address.save((err, newAddr) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send(newAddr);
      })
    }

  }) 	    
};
