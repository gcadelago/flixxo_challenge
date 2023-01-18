import { RequestHandler } from 'express';
import { Role } from '../database/models/Role';

export const roleExists: RequestHandler = async (req, res, next) => {
  let {role} = req.body;

  await Role.findOne({
    where: { name: role },
  })
    .then((role) => {
      if (!role){ 
        return res.status(404).json({ msg: 'Role not found' });
      } else {
        next()
      }
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};
