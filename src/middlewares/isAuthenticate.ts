import 'dotenv/config';
import { isJwtExpired } from 'jwt-check-expiration';
import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../database/models/User';

export const isAuthenticated: RequestHandler = async (req, res, next) => {
    try {
      if (
        req.headers['authorization'] &&
        !isJwtExpired(req.headers['authorization'])
      ) {
        let authHeader = req.headers['authorization'];
  
        if (authHeader && authHeader.includes('Bearer'))
          authHeader = authHeader.slice(7, authHeader.length);
  
        const decodedToken = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET!);
  
        const loggedUser = await User.findOne({
          where: {
            email: (decodedToken as jwt.JwtPayload).email,
          },
          relations: ['role'],
        });
        if (!loggedUser)
          return res
            .status(400)
            .json({ msg: 'A problem occurred while decoding the token' });
  
        req.user = {
          id: loggedUser.id,
          name: loggedUser.name,
          email: loggedUser.email,
          role: loggedUser.role,
        };
  
        next();
      } else {
        return res.status(401).json({ msg: 'Login to continue' });
      }
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  };