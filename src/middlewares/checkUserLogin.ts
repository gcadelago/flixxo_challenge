import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';

import { User } from '../database/models/User';

export const checkUserLogin: RequestHandler = async (req, res, next) => {
  let {email, password} = req.body;
  let userPassword;

  await User.findOne({
    where: { email },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'Incorrect email and/or password' });
      }{
        req.body.id = user.id
        userPassword = user.password
      }
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
  
  await bcrypt.compare(password, userPassword).then((passwordIsValid) => {
    if (passwordIsValid) {
      return res.status(404).json({ msg: 'Incorrect email and/or password' });
    } else {
      next();
    }
  })
  .catch((err) => {
    return res.status(400).json(err.message);
  });
};
