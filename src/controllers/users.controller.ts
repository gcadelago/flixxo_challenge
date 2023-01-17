import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';

import { Role } from '../database/models/Role';
import { User } from '../database/models/User';

export const index: RequestHandler = async (req, res) => {
  try {
    const users = await User.find({
      order: { updated_at: 'DESC' },
      relations: ['role'],
    });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const show: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findOne({ where: { id }, relations: ['role'] });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const store: RequestHandler = async (req, res) => {
  const { email, name, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const roleObj = await Role.findOne({ where: { name: role } });
    if (!roleObj) return res.status(404).json({ msg: 'Role not found' });

    const newUser = await User.save({
      name,
      email,
      password: hashedPassword,
      role: roleObj,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updatePayload = req.body;

  try {
    const userExists = await User.findOne({ where: { id }, relations: ['role'] });
    if (!userExists) return res.status(404).json({ msg: 'User not found' });

    if (updatePayload.role) {
      const roleObj = await Role.findOne({ where: { name: updatePayload.role } });
      if (!roleObj) return res.status(404).json({ msg: 'Role not found' });
      updatePayload.role = roleObj;
    }
    if (updatePayload.email && userExists.email != updatePayload.email) {
      const alreadyExists = await User.findOne({
        where: { email: updatePayload.email },
      });
      if (alreadyExists)
        return res
          .status(404)
          .json({ msg: 'The entered email is already in use' });
    }
    if (updatePayload.password) {
      const newPassword = await bcrypt.hash(updatePayload.password, 10);
      updatePayload.password = newPassword;
    }

    const userUpdate: User = {
      ...userExists,
      ...updatePayload,
    };

    const updatedUser = await User.save(userUpdate);

    return res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const isExist: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id }, relations: ['role'] });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const disable: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user?.id == id) {
      res.status(404).json({ msg: 'You cannot delete your own user' });
    }
    const userExists = await User.findOne({ where: { id } });
    if (!userExists) return res.status(404).json({ msg: 'User not found' });

    let date = new Date();

    return res.status(200).json(userExists);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const enable: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.update(id, { deleted_at: null });
    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });

    return res.status(200).json({ msg: 'User successfully enabled' });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
