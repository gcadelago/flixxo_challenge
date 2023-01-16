import { Express } from 'express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

import { swaggerOptions } from '../utils/swaggerOptions';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';

const setup = swaggerJSDoc(swaggerOptions);

export const createRoutes = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setup));
  app.use('/users', usersRoutes);
  app.use('/', authRoutes);
};
