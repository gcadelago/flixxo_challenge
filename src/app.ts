import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import { createRoutes } from './routes';

const app = express();

//settings
app.set('port', process.env.PORT || 8080)

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
createRoutes(app);

export default app;
