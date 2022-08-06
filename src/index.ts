import dotenv from 'dotenv';
dotenv.config();

import { FilmAgent } from './agents/film-agent';
import { UserAgent } from './agents/user-agent';
import initializeDatabase from './database/neo4j.driver';

const main = async () => {
  const driver = await initializeDatabase();

  const userAgent = new UserAgent(driver);
  const filmAgent = new FilmAgent(driver);

  // Criamos nosso usuário
  const fabio = await userAgent.create({ name: 'Fabio' });

  // Filmes que fabio gosta
  await userAgent.likeFilm(fabio, 121);
  await userAgent.likeFilm(fabio, 116);
  await userAgent.likeFilm(fabio, 111);

  // Encontraremos as recomendações base de Fabio
  const baseRecommendations = await filmAgent.findRecommendations(fabio);

  // Exibimos em tela
  const jsonBaseRecommendations = baseRecommendations.map((film) => film.toJSON());
  console.log('\n\nRECOMENDAÇÕES INICIAIS\n')
  console.log(JSON.stringify(jsonBaseRecommendations, null, 2));

  // Criaremos mais alguns usuários
  const marcos = await userAgent.create({ name: 'Marcos' });
  const luiz = await userAgent.create({ name: 'Luiz' });
  const antonio = await userAgent.create({ name: 'Antonio' });

  // Relacionaremos eles com o Fabio
  await userAgent.becomeFriendsWith({ user: fabio, friend: marcos });
  await userAgent.becomeFriendsWith({ user: fabio, friend: luiz });
  await userAgent.becomeFriendsWith({ user: fabio, friend: antonio });

  // Filmes que Marcos gosta
  await userAgent.likeFilm(marcos, 152);
  await userAgent.likeFilm(marcos, 154);
  await userAgent.likeFilm(marcos, 157);

  // Filmes que Luiz gosta
  await userAgent.likeFilm(luiz, 161);
  await userAgent.likeFilm(luiz, 0);
  await userAgent.likeFilm(luiz, 11);

  // Filmes que Antonio gosta
  await userAgent.likeFilm(antonio, 11);
  await userAgent.likeFilm(antonio, 152);
  await userAgent.likeFilm(antonio, 56);

  // Executar a seguinte query no browser do Neo4j:
  // MATCH (m:Movie)<-[:LIKES]-(u:User)-[:FRIENDS_WITH]->(u2:User)-[:LIKES]->(m2:Movie)
  // WHERE u.name = 'Fabio'
  // RETURN u, m, u2, m2

  const fabioRecommendations = await filmAgent.findRecommendations(fabio);

  const jsonRecommendations = fabioRecommendations.map((film) => film.toJSON());

  console.log('\n\nRECOMENDAÇÕES FINAIS\n')
  console.log(JSON.stringify(jsonRecommendations, null, 2));
}

const down = async () => {
  const driver = await initializeDatabase();

  await driver.session().run(`MATCH (a: User) WHERE a.name='Marcos' DETACH DELETE a`);
  await driver.session().run(`MATCH (a: User) WHERE a.name='Luiz' DETACH DELETE a`);
  await driver.session().run(`MATCH (a: User) WHERE a.name='Antonio' DETACH DELETE a`);
  await driver.session().run(`MATCH (a: User) WHERE a.name='Fabio' DETACH DELETE a`);

  console.log('pronto');
}

down();
