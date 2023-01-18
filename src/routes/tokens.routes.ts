import * as express from 'express';

import {
  index,
  show,
  store,
  update,
} from '../controllers/token.controller';
import { isAuthenticated } from '../middlewares/isAuthenticate';
import { tokenExists } from '../middlewares/tokenExists';
import { validateAddToken, validateTokenId, validateUpdateToken } from '../validators/token';

const router = express.Router();

/**
 * @openapi
 * path:
 * /tokens:
 *  get:
 *    description: List all tokens
 *    summary: List all tokens
 *    tags:
 *      - tokens
 *    responses:
 *        200:
 *         description: List tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               "example": [
 *                 {
 *                   tkn_id: ,
 *                   tkn_tricker: ,
 *                   tkn_name:
 *                 }
 *               ]
 *        400:
 *          description: Error searching for tokens
 */
router.get('/', index);

/**
 * @openapi
 * path:
 * /tokens/{tkn_id}:
 *  get:
 *    description: Get detailed information about a token
 *    summary: Get a token
 *    tags:
 *      - tokens
 *    responses:
 *        200:
 *         description: List tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created_at:
 *                   type: datetime
 *                   example: 2023-01-17T17:58:19.000Z
 *                 updated_at:
 *                   type: datetime
 *                   example: 2023-01-17T17:58:19.000Z
 *                 tkn_id:
 *                   type: string
 *                   example: tomato_coin
 *                 tkn_tricker:
 *                   type: string
 *                   example: bptc
 *                 tkn_name:
 *                   type: string
 *                   example: Tomato Coin
 *                 tkn_trade_url:
 *                   type: string
 *                   example: https://www.probit.com/app/exchange/BPTC-USDT
 *        404:
 *          description: Token not found
 *        400:
 *          description: Error obtaining token
 */
router.get('/:tkn_id', validateTokenId, tokenExists, show);

/**
 * @openapi
 * path:
 * /tokens:
 *   post:
 *      description: Add new token
 *      summary: Add new token
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - tokens
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
 *                tkn_id:
 *                  type: string
 *                  format: varchar(255)
 *                  example: tomato_coin
 *                tkn_tricker:
 *                  type: string
 *                  format: varchar(255)
 *                  example: bptc
 *                tkn_name:
 *                  type: string
 *                  format: varchar(255)
 *                  example: Tomato Coin
 *                tkn_trade_url:
 *                  type: string
 *                  format: varchar(255)
 *                  example: https://www.probit.com/app/exchange/BPTC-USDT
 *      responses:
 *        200:
 *          description: Token saved successfully
 *        403:
 *          description: Token ID in use
 *        400:
 *          description: Error saving token
 */
router.post('/', isAuthenticated, validateAddToken, store);

/**
 * @openapi
 * path:
 * /tokens/{tkn_id}:
 *   patch:
 *      description: Update token information
 *      summary: Update token information
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - tokens
 *      parameters:
 *      - in: params
 *        name: tkn_id
 *        schema:
 *          type: integer
 *        required: true
 *        example: e48556ed-4dc1-4509-8542-1cba2d07ef50
 *        description: Id token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tkn_tricker:
 *                  type: string
 *                  format: varchar(255)
 *                  example: bptc
 *                tkn_name:
 *                  type: string
 *                  format: varchar(255)
 *                  example: Tomato Coin
 *                tkn_trade_url:
 *                  type: string
 *                  format: varchar(255)
 *                  example: https://www.probit.com/app/exchange/BPTC-USDT
 *      responses:
 *        201:
 *          description: Returns the token in the header
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: 15c1443c-3272-45b9-80b6-ad76bc158859
 *                  created_at:
 *                    type: datetime
 *                    example: 2023-01-17T17:58:19.000Z
 *                  updated_at:
 *                    type: datetime
 *                    example: 2023-01-17T17:58:19.000Z
 *                  tkn_id:
 *                    type: string
 *                    example: tomato_coin
 *                  tkn_tricker:
 *                    type: string
 *                    example: bptc
 *                  tkn_name:
 *                    type: string
 *                    example: Tomato Coin
 *                  tkn_trade_url:
 *                    type: string
 *                    example: https://www.probit.com/app/exchange/BPTC-USDT
 *        404:
 *          description: Token not found
 *        400:
 *          description: Error updating token
 */
router.patch('/:tkn_id', isAuthenticated, validateTokenId, validateUpdateToken, update);

export default router;
