import { RequestHandler } from 'express';

export const policyAdminOnly: RequestHandler = async (req, res, next) => {
    if (req.user.role.name === 'admin') {
      req.user.role.name;
      next();
    } else {
      res.status(400).json({ msg: 'Not authorized' });
    }
  };