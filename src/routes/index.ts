import { Express } from 'express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

import { swaggerOptions } from '../utils/swaggerOptions';
import authRoutes from './auth.routes';
import tokensRoutes from './tokens.routes';
import mdRoutes from './market-data.routes';

const setup = swaggerJSDoc(swaggerOptions);

export const createRoutes = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setup));
  app.use('/tokens', tokensRoutes);
  app.use('/market-data', mdRoutes);
  app.use('/', authRoutes);
  app.use((req: any, res, next) => {
    if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
  });
  app.use((req, res) => {
    res.status(404).json({message: 'Page not found'});
  });
};
