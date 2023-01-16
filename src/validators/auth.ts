import { check } from 'express-validator';

import { validateResult } from './helpers/validateHelper';

export const validateEmail = [
  check('email')
    .exists()
    .isLength({ min: 5 })
    .withMessage('The mail must contain more than 5 characters')
    .isEmail()
    .withMessage('Does not contain a valid email format'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateNewPassword = [
  check('newPassword')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password must be longer than 6 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateLogin = [
  check('email')
    .optional({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('The mail must contain more than 5 characters')
    .isEmail()
    .withMessage('Does not contain a valid email format'),
  check('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be longer than 6 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateAddUser = [
  check('name')
    .exists()
    .isLength({ min: 3 })
    .withMessage('The name must contain at least 3 characters'),
  check('last_name')
    .exists()
    .isLength({ max: 100 })
    .withMessage('El apellido debe contener maximo 100 caracteres'),
  check('alias')
    .exists()
    .isLength({ max: 100 })
    .withMessage('The alias must contain 100 characters maximum'),
  check('email')
    .exists()
    .isLength({ min: 5 })
    .withMessage('The mail must contain more than 5 characters')
    .isEmail()
    .withMessage('Does not contain a valid email format'),
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password must be longer than 6 characters'),
  check('role').exists().isString().withMessage('Role must be valid'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateUpdateUser = [
  check('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('The name must contain at least 3 characters'),
  check('last_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('The last name must contain a maximum of 100 characters'),
  check('alias')
    .optional()
    .isLength({ max: 100 })
    .withMessage('The alias must contain 100 characters maximum'),
  check('email')
    .optional()
    .isLength({ min: 5 })
    .withMessage('The mail must contain more than 5 characters')
    .isEmail()
    .withMessage('Does not contain a valid email format'),
  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be longer than 6 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
