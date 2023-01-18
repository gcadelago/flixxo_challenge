import 'reflect-metadata';

import { dbInit } from './database/init';
import app from './app';

app.listen(app.get('port'), async () => {
  await dbInit();
  console.log(`Server running on port ${app.get('port')}\n`);
});
