import * as express from 'express';

import {
  index,
  show,
  store,
  update,
  disable,
  enable,
} from '../controllers/users.controller';
import { isAuthenticated } from '../middlewares/isAuthenticate';
import { isEmailUnique } from '../middlewares/isEmailUnique';
import { policyAdminOnly } from '../middlewares/policyAdminOnly';
import { validateUpdateUser, validateAddUser } from '../validators/auth';

const router = express.Router();

router.get('/', isAuthenticated, index);

router.get('/:id', isAuthenticated, show);

router.post('/', isAuthenticated, policyAdminOnly, validateAddUser, isEmailUnique, store);

router.patch('/:id', isAuthenticated, policyAdminOnly, validateUpdateUser, update);

router.delete('/:id', isAuthenticated, policyAdminOnly, disable);

router.patch('/:id/enable', isAuthenticated, policyAdminOnly, enable);

export default router;
