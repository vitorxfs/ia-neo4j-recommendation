import dotenv from 'dotenv';
dotenv.config();

import driver from './database/neo4j.driver';
import { User } from './models/user';
import { UserService } from './services/user-service';

const main = async () => {
  const userService = new UserService(driver);

  const julio = await userService.create({ name: 'Julio' });
  const renato = await userService.create({ name: 'Renato' });
  const marcos = await userService.create({ name: 'Marcos' });
  const estefano = await userService.create({ name: 'Estefano' });

  const recommendations = userService.findRecommendations(julio);

  await userService.becomeFriendsWith({ user: julio, friend: renato });
  await userService.becomeFriendsWith({ user: julio, friend: marcos });
  await userService.becomeFriendsWith({ user: julio, friend: estefano });

  // Filmes que Julio gosta
  await userService.likeFilm(julio, 1);
  await userService.likeFilm(julio, 2);
  await userService.likeFilm(julio, 3);

  // Filmes que Renato gosta
  await userService.likeFilm(julio, 4);
  await userService.likeFilm(julio, 5);
  await userService.likeFilm(julio, 6);

  // Filmes que Marcos gosta
  await userService.likeFilm(julio, 5);
  await userService.likeFilm(julio, 6);
  await userService.likeFilm(julio, 7);

  // Filmes que Estefano gosta
  await userService.likeFilm(julio, 5);
  await userService.likeFilm(julio, 7);
  await userService.likeFilm(julio, 8);

  const julioRecommendations = await userService.findRecommendations(julio);

  const jsonRecommendations = julioRecommendations.map((film) => film.toJSON());

  console.log('RECOMENDAÇÕES PARA JULIO')
  console.log(JSON.stringify(jsonRecommendations, null, 2));
}

main();
