import dotenv from 'dotenv';
dotenv.config();

import { FilmAgent } from './agents/film-agent';
import { User } from './models/user';
import { UserAgent } from './agents/user-agent';
import initializeDatabase from './database/neo4j.driver';

const main = async () => {
  const driver = await initializeDatabase();

  const userAgent = new UserAgent(driver);
  const filmAgent = new FilmAgent(driver);

  const julio = await userAgent.create({ name: 'Julio' });
  const renato = await userAgent.create({ name: 'Renato' });
  //const marcos = await userAgent.create({ name: 'Marcos' });
  const estefano = await userAgent.create({ name: 'Estefano' });

  const recommendations = filmAgent.findRecommendations(julio);

  await userAgent.becomeFriendsWith({ user: julio, friend: renato });
  // await userAgent.becomeFriendsWith({ user: julio, friend: marcos });
  await userAgent.becomeFriendsWith({ user: julio, friend: estefano });

  // Filmes que Julio gosta
  await userAgent.likeFilm(julio, 1);
  await userAgent.likeFilm(julio, 2);
  await userAgent.likeFilm(julio, 3);

  // Filmes que Renato gosta
  await userAgent.likeFilm(julio, 4);
  await userAgent.likeFilm(julio, 5);
  await userAgent.likeFilm(julio, 6);

  // Filmes que Marcos gosta
  await userAgent.likeFilm(julio, 5);
  await userAgent.likeFilm(julio, 6);
  await userAgent.likeFilm(julio, 7);

  // Filmes que Estefano gosta
  await userAgent.likeFilm(julio, 5);
  await userAgent.likeFilm(julio, 7);
  await userAgent.likeFilm(julio, 8);

  const julioRecommendations = await filmAgent.findRecommendations(julio);

  const jsonRecommendations = julioRecommendations.map((film) => film.toJSON());

  // const marcos = await userAgent.findUserById(178);
  //const teste = marcos.toJSON();

  // console.log(marcos.identity.low);

  /* console.log('RECOMENDAÇÕES PARA JULIO')
  console.log(JSON.stringify(jsonRecommendations, null, 2)); */
}

main();
