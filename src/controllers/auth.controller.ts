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

export const logOut: RequestHandler = async (req, res, next) => {
  res.clearCookie('jwt');
  next();
};
