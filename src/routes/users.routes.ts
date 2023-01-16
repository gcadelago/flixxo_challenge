import * as express from 'express';

import {
  index,
  show,
  store,
  update,
  disable,
  enable,
} from '../controllers/users.controller';
import { isAuthenticated, adminOnly } from '../controllers/auth.controller';
import { isEmailUnique } from '../middlewares/isEmailUnique';
import { validateUpdateUser, validateAddUser } from '../validators/auth';

const router = express.Router();

/**
 * @openapi
 * path:
 * /users:
 *  get:
 *    description: Get all users
 *    summary: Get all users
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Users
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: Bearer token
 *        required: true
 *    responses:
 *        200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               "example": [
 *                 {
 *                   "id": "0bc90c26-d872-4e64-ab17-b31d8f84e65c",
 *                   "name": "John",
 *                   "last_name": "Doe",
 *                   "alias": "Admin",
 *                   "email": "johndoe@example.com",
 *                   "created_at": "2022-08-11T18:33:34.000Z",
 *                   "updated_at": "2022-08-11T18:33:34.000Z",
 *                   "role": {
 *                   name: admin,
 *                   },
 *                 }
 *               ]
 *        400:
 *          description: Error searching for users
 */
router.get('/', isAuthenticated, index);

/**
 * @openapi
 * path:
 * /users/{id}:
 *  get:
 *    description: Get a user by id
 *    summary: Get a user by id
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Users
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: Bearer token
 *        required: true
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: User ID
 *    responses:
 *        200:
 *         description: Returns a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               "example": {
 *                   "id": "0bc90c26-d872-4e64-ab17-b31d8f84e65c",
 *                   "name": "John",
 *                   "last_name": "Doe",
 *                   "alias": "Admin",
 *                   "email": "johndoe@example.com",
 *                   "created_at": "2022-08-11T18:33:34.000Z",
 *                   "updated_at": "2022-08-11T18:33:34.000Z",
 *                   "role": {
 *                   "id": "3f371e03-3c2e-438e-b5a5-f281f660b113",
 *                   name: admin,
 *                   },
 *               }
 *        404:
 *          description: User not found
 *        400:
 *          description: Error
 */
router.get('/:id', isAuthenticated, show);

/**
 * @openapi
 * path:
 * /users:
 *   post:
 *      description: Create a new user
 *      summary: Create a new user
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Users
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: Bearer token
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  format: varchar(100)
 *                  example: John
 *                last_name:
 *                  type: string
 *                  format: varchar(100)
 *                  example: Doe
 *                alias:
 *                  type: string
 *                  format: varchar(100)
 *                  example: johndoe
 *                email:
 *                  type: string
 *                  format: varchar(100)
 *                  example: johndoe@example.com
 *                password:
 *                  type: string
 *                  format: varchar(255)
 *                  example: secret
 *                role:
 *                  type: string
 *                  format: varchar(100)
 *                  example: "admin"
 *      responses:
 *        201:
 *          description: Created user
 *        400:
 *          description: A user already exists with this email address
 */
router.post('/', isAuthenticated, adminOnly, validateAddUser, isEmailUnique, store);

/**
 * @openapi
 * path:
 * /users/{id}:
 *   patch:
 *      description: Update a user
 *      summary: Update a user
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Users
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *          description: User ID
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: Bearer token
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  format: varchar(50)
 *                  example: Joe
 *                last_name:
 *                  type: string
 *                  format: varchar(100)
 *                  example: Doakes
 *                alias:
 *                  type: string
 *                  format: varchar(100)
 *                  example: joedoakes
 *                email:
 *                  type: string
 *                  format: varchar(100)
 *                  example: joedoakes@example.com
 *                password:
 *                  type: string
 *                  format: varchar(100)
 *                  example: secretupdate
 *                role:
 *                  type: string
 *                  format: varchar(100)
 *                  example: "manager"
 *      responses:
 *        201:
 *          description: User successfully updated
 *        400:
 *          description: Error updating user
 *        404:
 *          description: A user already exists with this email address/User not found/Role not found
 */
router.patch('/:id', isAuthenticated, adminOnly, validateUpdateUser, update);

/**
 * @openapi
 * path:
 * /users/{id}:
 *  delete:
 *    description: Disable a user
 *    summary: Disable a user
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: User ID
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: Bearer token
 *        required: true
 *    responses:
 *        200:
 *         description: User disabled successfully
 *        400:
 *          description: User not found / You cannot delete your own user
 *        404:
 *          description: User not found
 */
router.delete('/:id', isAuthenticated, adminOnly, disable);

/**
 * @openapi
 * path:
 * /users/{id}/enable:
 *  patch:
 *    description: Enable a user
 *    summary: Enable a user
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: User ID
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: Bearer token
 *        required: true
 *    responses:
 *        200:
 *         description: User successfully enabled
 *        400:
 *          description: Error enabling user
 *        404:
 *         description: User not found
 */
router.patch('/:id/enable', isAuthenticated, adminOnly, enable);

export default router;
