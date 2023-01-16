import 'reflect-metadata';

import { dbInit } from './database/init';
import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await dbInit();
  console.log(`Server running on http://localhost:${PORT}\n`);
});
