import { Router } from 'express';

import { logIn } from '../controllers/auth.controller';
import { validateLogin } from '../validators/auth';

const router = Router();

/**
 * @openapi
 * path:
 * /login:
 *   post:
 *      description: User login
 *      summary: User login
 *      tags:
 *        - Auth
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: varchar(100)
 *                  example: admin@ejemplo.com
 *                password:
 *                  type: string
 *                  format: varchar(255)
 *                  example: secret4
 *      responses:
 *        200:
 *          description: User successfully logged in
 *        401:
 *          description: Incorrect username and/or password
 *        404:
 *          description: Invalid Email
 */
router.post('/login', validateLogin, logIn);

export default router;
