import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import { createRoutes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
createRoutes(app);

app.use((req: any, res, next) => {
  if (!req.user) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  }
  next();
});
app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Page not found',
  });
});

export default app;
