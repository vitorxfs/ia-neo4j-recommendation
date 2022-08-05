import neo4j, { Driver } from 'neo4j-driver';
import {
  NEO4J_PASSWORD,
  NEO4J_URI,
  NEO4J_USERNAME
} from '../env';

const initializeDatabase = async (): Promise<Driver> => {
  try {
    return await neo4j.driver(
      NEO4J_URI,
      neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
    );
  } catch (err) {
    throw new Error('Could not connect to database');
  }
}

export default initializeDatabase;
