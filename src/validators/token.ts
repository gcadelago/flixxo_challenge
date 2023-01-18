import { check, param } from 'express-validator';
import { Token } from '../database/models/Token';

import { validateResult } from './helpers/validateHelper';

export const validateAddToken = [
  check('tkn_id')
    .exists()
    .isLength({ min: 1, max:255 })
    .withMessage('Id must contain between 1 and 255 characters')
    .custom(value => {
      return Token.findOne({ where: {tkn_id: value} })
          .then((token) => {
            if(token)return Promise.reject('Token ID in use')
          })
    }),
  check('tkn_tricker')
    .exists()
    .isLength({ min: 1, max:255 })
    .withMessage('Tricker must contain between 1 and 255 characters'),
  check('tkn_name')
    .exists()
    .isLength({ min: 1, max:255 })
    .withMessage('Name must contain between 1 and 255 characters'),
  check('tkn_trade_url')
    .optional()
    .isLength({ min: 1, max:255 })
    .withMessage('URL must contain between 1 and 255 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateUpdateToken = [
  check('tkn_tricker')
    .optional()
    .isLength({ min: 1, max:255 })
    .withMessage('Tricker must contain between 1 and 255 characters'),
  check('tkn_name')
    .optional()
    .isLength({ min: 1, max:255 })
    .withMessage('Name must contain between 1 and 255 characters'),
  check('tkn_trade_url')
    .optional()
    .isLength({ min: 1, max:255 })
    .withMessage('URL must contain between 1 and 255 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateTokenId = [
  param('tkn_id')
    .exists()
    .isLength({ min: 1, max: 255 })
    .withMessage('Id must contain between 1 and 255 characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];