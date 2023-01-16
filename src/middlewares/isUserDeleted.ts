import { RequestHandler } from 'express';
import { IsNull, Not } from 'typeorm';

import { User } from '../database/models/User';

export const isUserDeleted: RequestHandler = async (req, res, next) => {
  let email = req.body.email;

  await User.findOne({
    where: { email: email, deleted_at: Not(IsNull()) },
    withDeleted: true,
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: 'El usuario se encuentra inhabilitado' });
      } else {
        next();
      }
    })
    .catch((err) => {
      return res.status(500).json(err.message);
    });
};
