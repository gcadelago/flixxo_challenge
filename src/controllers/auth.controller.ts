import 'dotenv/config';
import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

export const logIn: RequestHandler = async (req, res) => {
  const {email, id} = req.body
  
  try {
      const token = jwt.sign(
        { id, email },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.TOKEN_EXPIRES || '8h' },
      );

      return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const logOut: RequestHandler = async (req, res, next) => {
  res.clearCookie('jwt');
  next();
};
