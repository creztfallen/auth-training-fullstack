const bcrypt = require('bcrypt');
const User = require('../db/userModel');

exports.createNewUser = async (req, res) => {
  let user = User.findOne({ email: req.body.email });

  try {
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        user = new User({
          email: req.body.email,
          password: hashedPassword,
        });

        user
          .save()
          .then((result) => {
            res
              .status(201)
              .send({ message: 'User created Successfully', result });
          })
          .catch((error) => {
            res.status(500).send({ message: 'Error creating user', error });
          });
      })
      .catch((e) => {
        res
          .status(500)
          .send({ message: 'Password was not hashed successfully', e });
      });
  } catch {
    return res.status(400).send('That user already exists!');
  }
};
