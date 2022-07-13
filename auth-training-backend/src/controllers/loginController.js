const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/userModel');
const _ = require('lodash');

exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Incorrect username or password!');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect username or password!');
  }

  const PrivateKey = 'PrivateKey';
  const token = jwt.sign(
    { _id: user._id, userName: user.userName },
    PrivateKey
  );
  res
    .header('x-auth-token', token)
    .send({ ..._.pick(user, ['_id', 'email']), token });
};
