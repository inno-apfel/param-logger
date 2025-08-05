import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
import { execSync } from 'child_process';

async function resetTestDatabase() {
  execSync('npx prisma migrate reset --force --skip-generate --skip-seed', {
    env: {
      ...process.env,
      // SET PRISMA TO RESET TEST DATABASE ONLY
      DATABASE_URL: process.env.TEST_DATABASE_URL,
    },
    stdio: 'inherit',
  });
}

export default resetTestDatabase;