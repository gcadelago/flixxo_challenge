import * as express from 'express';

import {
  lastPrice,
  history,
  store
} from '../controllers/market-data.controller';
import { isAuthenticated } from '../middlewares/isAuthenticate';
import { tokenExists } from '../middlewares/tokenExists';
import { validateAddPriceToken, validateMDId } from '../validators/market-data';

const router = express.Router();

/**
 * @openapi
 * path:
 * /market-data/{tkn_id}:
 *  get:
 *    description: Get detailed information about a token
 *    summary: Get last price of a token
 *    tags:
 *      - market_data
 *    parameters:
 *      - in: params
 *        name: tkn_id
 *        schema:
 *          type: integer
 *        required: true
 *        example: tomato_coin
 *        description: Id token
 *    responses:
 *        200:
 *         description: get token
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
router.get('/:tkn_id', tokenExists, lastPrice);

/**
 * @openapi
 * path:
 * /market-data/{tkn_id}/history:
 *  get:
 *    description: Get price history of a token
 *    summary: Get price history of a token
 *    tags:
 *      - market_data
 *    parameters:
 *      - in: params
 *        name: tkn_id
 *        schema:
 *          type: integer
 *        required: true
 *        example: tomato_coin
 *        description: Id token
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        example: 0
 *        description: Page number to be positioned
 *      - in: query
 *        name: rows
 *        schema:
 *          type: integer
 *        required: false
 *        example: 15
 *        description: The number of rows per page
 *    responses:
 *        200:
 *         description: List token prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token_id:
 *                   type: string
 *                   example: tomato_coin
 *                 content:
 *                   type: array
 *                   "example": [
 *                     {
 *                       "id": "1",
 *                       "updated_at": "2023-01-18T00:31:07.932Z",
 *                       "md_current_price": 12.3,
 *                       "md_volume": 12312300,
 *                       "md_date_history": "2023-01-18T00:29:16.000Z"
 *                     },
 *                     {
 *                       "id": "2",
 *                       "updated_at": "2023-01-18T00:31:07.932Z",
 *                       "md_current_price": 13,
 *                       "md_volume": 12300000,
 *                       "md_date_history": "2023-01-18T00:30:10.000Z"
 *                     },
 *                   ]
 *                 total_pages:
 *                   type: integer
 *                   format: int(255)
 *                   example: 1
 *        404:
 *          description: Token not found
 *        400:
 *          description: Error obtaining token
 */
router.get('/:tkn_id/history', tokenExists, history);

/**
 * @openapi
 * path:
 * /market-data:
 *   post:
 *      description: Insert a new price for a token
 *      summary: Insert a new price for a token
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - market_data
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                md_token_id:
 *                  type: Token
 *                  format: integer(255)
 *                  example: tomato_coin
 *                  required: true
 *                md_current_price:
 *                  type: integer
 *                  format: float()
 *                  example: Mataloni
 *                  required: true
 *                md_volume:
 *                  type: integer
 *                  format: float()
 *                  example: 12312300
 *                  required: true
 *                md_date_history:
 *                  type: date
 *                  format: datetime()
 *                  example: 2023-01-18T00:29:16.000Z
 *                  required: true
 *      responses:
 *        201:
 *          description: Returns the token in the header
 *        400:
 *          description: Error saved token
 */
router.post('/', isAuthenticated, tokenExists, validateAddPriceToken, store);

export default router;
