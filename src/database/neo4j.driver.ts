import neo4j from 'neo4j-driver';
import {
  NEO4J_PASSWORD,
  NEO4J_URI,
  NEO4J_USERNAME
} from '../env';

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
)

export default driver;
