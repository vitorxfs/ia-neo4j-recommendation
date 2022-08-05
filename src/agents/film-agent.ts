import { Driver } from 'neo4j-driver';
import { Film } from '../models/film';
import { User } from '../models/user';

export class FilmAgent {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async findRecommendations(user: User): Promise<Film[]> {
    // TODO: Query Recommendations
    const films = [{
      id: 0,
      genres: [],
      name: 'A volta dos que não foram',
      directorName: 'Nistofer Chrolan',
      releaseYear: 2002,
    }]; // isso será substituido pelo retorno da api;

    return films.map((film) => new Film({
      id: film.id,
      name: film.name,
      directorName: film.directorName,
      genres: film.genres,
      releaseYear: film.releaseYear
    }))
  }
}
