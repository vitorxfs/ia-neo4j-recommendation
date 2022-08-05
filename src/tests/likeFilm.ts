import dotenv from 'dotenv';
dotenv.config();

import initializeDatabase from '../database/neo4j.driver';
import { FilmAgent } from '../agents/film-agent';
import { UserAgent } from '../agents/user-agent';

const up = async () => {
  const driver = await initializeDatabase();

  const userAgent = new UserAgent(driver);
  const filmAgent = new FilmAgent(driver);

  const fulano = await userAgent.create({ name: 'Fulano' });

  console.log(JSON.stringify(fulano, null, 2));

  await userAgent.likeFilm(fulano, 0);

  console.log('pronto')
}

const down = async () => {
  const driver = await initializeDatabase();

  await driver.session().run("MATCH (a: User) WHERE a.name='Fulano' DETACH DELETE a");

  console.log('pronto');
}

down();
