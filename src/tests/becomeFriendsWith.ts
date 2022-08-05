import dotenv from 'dotenv';
dotenv.config();

import initializeDatabase from '../database/neo4j.driver';
import { UserAgent } from '../agents/user-agent';

const up = async () => {
  const driver = await initializeDatabase();

  const userAgent = new UserAgent(driver);

  const fulano = await userAgent.create({ name: 'Fulano' });
  const ciclano = await userAgent.create({ name: 'Ciclano' });

  console.log(JSON.stringify(fulano, null, 2));
  console.log(JSON.stringify(ciclano, null, 2));

  await userAgent.becomeFriendsWith({ user: fulano, friend: ciclano});

  console.log('pronto')
}

const down = async () => {
  const driver = await initializeDatabase();

  await driver.session().run("MATCH (a: User) WHERE a.name='Fulano' DETACH DELETE a");
  await driver.session().run("MATCH (a: User) WHERE a.name='Ciclano' DETACH DELETE a");

  console.log('pronto');
}

down();
