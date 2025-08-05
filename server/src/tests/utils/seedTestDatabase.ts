import dotenv from 'dotenv';
import path from 'path';

// SET PRISMA CLIENT TO USE TEST DATABASE
// MUST DO THIS BEFORE IMPORTING SERVICES
// Since services will start prisma client with process.env.DATABASE_URL
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

import userService from '../../services/users';
import tankService from '../../services/tanks';
import parameterService from '../../services/parameters';
import observationService from '../../services/observations';
import { 
  type createEntityData,
  generateSeedData 
} from './seedDataGenerator'

// Must fulfill sequential parentage condition (n is parent of n+1)
const createTestingModelsData: createEntityData = [
  {
    name: 'user',
    numToCreate: 2,
    createEntityFunc: async () => {
      const username = faker.internet.username();
      const password = faker.internet.password({ length: 12, memorable: true }) + 'Ab1!';
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await userService.createUser(username, hashedPassword);
      const userWithPassword = {
        ...user,
        password: password
      }
      return userWithPassword;
    }
  },
  {
    name: 'tanks',
    numToCreate: 2,
    createEntityFunc: async (parent_id: string) => {
      const tankName = faker.word.adjective() + faker.animal.fish();
      return await tankService.createTank(tankName, parent_id);
    }
  },
  {
    name: 'parameters',
    numToCreate: 2,
    createEntityFunc: async (parent_id: string) => {
      const parameterName = faker.science.chemicalElement().name;
      const referenceValue = faker.number.float({ min: 0.1, max: 100.0 });
      const unit = faker.science.unit().symbol;
      return await parameterService.createParameter(parameterName, referenceValue, unit, parent_id);
    }
  },
  {
    name: 'observations',
    numToCreate: 2,
    createEntityFunc: async (parent_id: string) => {
      const value = faker.number.float({ min: 0, max: 100 });
      return await observationService.createObservation(value, parent_id);
    }
  },
];

async function main(){
  return { users: await generateSeedData(createTestingModelsData) };
}

export default main;