import 'dotenv/config';
import { isJwtExpired } from 'jwt-check-expiration';
import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from '../database/models/User';
import { Role } from '../database/models/Role';

export const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(404).json({ msg: 'Incorrect email and/or password' });
      // if (user.disabled) return res.status(400).json({ msg: 'Usuario deshabilitado' });

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid)
        return res.status(404).json({ msg: 'Incorrect email and/or password' });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.TOKEN_EXPIRES || '8h' },
      );

      return res.status(200).json({ id: user.id, token });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// export const changePassword: RequestHandler = async (req, res) => {
//   const { password } = req.body;
//   const jwt_cookie = req.cookies.jwt as string;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verifyResult = jwt.verify(jwt_cookie, process.env.ACCESS_TOKEN_SECRET!);
//     const { email }: any = verifyResult;

//     const user = await User.findOne({ where: { email } });
//     if (!user)
//       return res.status(400).json({ status: 400, msg: 'Usuario no encontrado' });

//     const updatedUser = await User.save({ ...user, password: hashedPassword });

//     return res.status(201).json({
//       msg: 'Contraseña cambiada correctamente',
//       updatedUser,
//     });
//   } catch (err) {
//     return res
//       .status(401)
//       .json({ status: 401, msg: 'Algo ha fallado jwt!', error: err.message });
//   }
// };

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
          .json({ msg: 'Ha ocurrido un problema al decodificar el token' });

      req.user = {
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
        role: loggedUser.role,
      };

      next();
    } else {
      return res.status(401).json({ msg: 'Debe iniciar sesión para continuar' });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const adminOnly: RequestHandler = async (req, res, next) => {
  if (req.user.role.name === 'admin') {
    req.user.role.name;
    next();
  } else {
    res.status(400).json({ msg: 'No autorizado' });
  }
};

export const logOut: RequestHandler = async (req, res, next) => {
  res.clearCookie('jwt');
  next();
};
