import { RequestHandler } from 'express';

import { Token } from '../database/models/Token';

export const tokenExists: RequestHandler = async (req, res, next) => {
  let {tkn_id} = req.body;

  await Token.findOne({
    where: { tkn_id },
  })
    .then((token) => {
      if (!token){ 
        return res.status(404).json({ msg: 'Token not found' });
      } else {
        next()
      }
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};
