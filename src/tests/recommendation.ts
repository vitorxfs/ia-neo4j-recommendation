import dotenv from 'dotenv';
dotenv.config();

import { FilmAgent } from '../agents/film-agent';
import { UserAgent } from '../agents/user-agent';
import initializeDatabase from '../database/neo4j.driver';

const USER_NAME_1 = 'Julio';
const USER_NAME_2 = 'Renato';
const USER_NAME_3 = 'Estefano';

const up = async () => {
  const driver = await initializeDatabase();

  const userAgent = new UserAgent(driver);
  const filmAgent = new FilmAgent(driver);

  const fulano = await userAgent.create({ name: USER_NAME_1 });
  const ciclano = await userAgent.create({ name: USER_NAME_2 });
  const beltrano = await userAgent.create({ name: USER_NAME_3 });

  const recommendations = filmAgent.findRecommendations(fulano);

  await userAgent.becomeFriendsWith({ user: fulano, friend: ciclano });
  await userAgent.becomeFriendsWith({ user: fulano, friend: beltrano });

  // Filmes que fulano gosta
  await userAgent.likeFilm(fulano, 0);
  await userAgent.likeFilm(fulano, 9);
  await userAgent.likeFilm(fulano, 10);

  // Filmes que Ciclano gosta
  await userAgent.likeFilm(ciclano, 11);
  await userAgent.likeFilm(ciclano, 15);
  await userAgent.likeFilm(ciclano, 29);

  // Filmes que Beltrano gosta
  await userAgent.likeFilm(beltrano, 15);
  await userAgent.likeFilm(beltrano, 29);
  await userAgent.likeFilm(beltrano, 37);

  const julio = await userAgent.findUserById(172);

  const fulanoRecommendations = await filmAgent.findRecommendations(julio);

  const jsonRecommendations = fulanoRecommendations.map((film) => film.toJSON());

  console.log(JSON.stringify(jsonRecommendations, null, 2));
}

const down = async () => {
  const driver = await initializeDatabase();

  await driver.session().run(`MATCH (a: User) WHERE a.name='${USER_NAME_1}' DETACH DELETE a`);
  await driver.session().run(`MATCH (a: User) WHERE a.name='${USER_NAME_2}' DETACH DELETE a`);
  await driver.session().run(`MATCH (a: User) WHERE a.name='${USER_NAME_3}' DETACH DELETE a`);

  console.log('pronto');
}

up();
