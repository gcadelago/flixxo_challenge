import { Router } from 'express';

import { logIn } from '../controllers/auth.controller';
import { checkUserLogin } from '../middlewares/checkUserLogin';
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
 *        - auth
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
 *                  example: admin@example.com
 *                password:
 *                  type: string
 *                  format: varchar(255)
 *                  example: secre4
 *      responses:
 *        200:
 *          description: User successfully logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  {
 *                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlMjVmNjI3LTFjZjYtNDg5ZC04ZDFlLTBjM2VmZTFkNGJlNSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2NzM5NjU,
 *                  }
 *        400:
 *          description: Error logging in 
 *        404:
 *          description: Incorrect username and/or password
 */
router.post('/login', validateLogin, checkUserLogin, logIn);

export default router;
