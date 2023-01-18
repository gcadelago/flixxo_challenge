import { RequestHandler } from 'express';
import { Role } from '../database/models/Role';

import { User } from '../database/models/User';

export const updateUser: RequestHandler = async (req, res, next) => {
  let {id} = req.body;

  const userExists = await User.findOne({ where: { id }, relations: ['role'] });
  if (!userExists) return res.status(404).json({ msg: 'User not found' });

  if (req.body.role) {
    const roleObj = await Role.findOne({ where: { name: req.body.role } });
    if (!roleObj) return res.status(404).json({ msg: 'Role not found' });
    req.body.role = roleObj;
  }
  if (req.body.email && userExists.email != req.body.email) {
    const alreadyExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (alreadyExists)
      return res
        .status(404)
        .json({ msg: 'The entered email is already in use' });
  }
};
