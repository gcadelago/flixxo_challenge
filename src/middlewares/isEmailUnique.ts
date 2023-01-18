import { RequestHandler } from 'express';

import { User } from '../database/models/User';

export const isEmailUnique: RequestHandler = async (req, res, next) => {
  let email = req.body.email;

  await User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ msg: 'El email ingresado ya se encuentra en uso' });
      } else {
        next();
      }
    })
    .catch((err) => {
      return res.status(500).json(err.message);
    });
};
