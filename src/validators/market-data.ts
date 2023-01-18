import { check, param } from 'express-validator';
import { Token } from '../database/models/Token';

import { validateResult } from './helpers/validateHelper';

export const validateAddPriceToken = [
  check('tkn_id')
    .exists()
    .isLength({ min: 1, max:255 })
    .withMessage('Id must contain between 1 and 255 characters')
    .custom(value => {
      return Token.findOne({ where: {tkn_id: value} })
          .then((token) => {
            if(!token)return Promise.reject('Token not found')
          })
    }),
  check('md_current_price')
    .exists()
    .isFloat({ min: 0, max: 99999999 })
    .withMessage('Price must be a value between 0 and 99999999.'),
  check('md_volume')
    .exists()
    .isFloat({ min: 0, max: 99999999 })
    .withMessage('Volume must be a value between 0 and 99999999.'),
  check('md_date_history')
    .exists()
    .isISO8601()
    .withMessage('No valid date format'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
export const validateMDId = [
  param('md_id')
    .exists()
    .isLength({ min: 1, max: 255 })
    .withMessage('Id must contain between 1 and 255 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];