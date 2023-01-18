import 'dotenv/config';
import { AppDataSource } from '../config';

export const dbInit = async (): Promise<void> => {
  try {
    console.log('\nRunning dbInit function...\n');
    await AppDataSource.initialize();
    console.log('\nDB connected\n');
  } catch (e) {
    throw new Error('An error occurred while connecting to the DB: ' + e);
  }
};
