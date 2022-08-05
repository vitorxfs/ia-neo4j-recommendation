import { Driver } from 'neo4j-driver';
import { Film } from '../models/film';
import { User } from '../models/user';

export class UserAgent {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async create({ name }: { name: string }): Promise<User> {
    const user = { name };
    // TODO: Create user

    const query = 'CREATE (n:User {name: "' + name + '"}) RETURN n';
    const session = this.driver.session();
    const result = await session.run(query);

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    return new User({
      name: node.properties.name, // substituir pelo name que o neo4j retornar
      id: node.identity.low, // substituir pelo ID que o neo4j retornar
    });
  }

  async findUserById(id: number): Promise<User> {
    // TODO: find user
    const query = 'MATCH (n) WHERE id(n) = ' + id + ' RETURN n';

    const session = this.driver.session();
    const result = await session.run(query);

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    return new User({
      name: node.properties.name, // substituir pelo name que o neo4j retornar
      id: node.identity.low, // substituir pelo ID que o neo4j retornar
    });
  }

  //Para criar relações entre nós (exemplo): MATCH (a:Person), (b:Person) CREATE (a)-[r:RELACAO]->(b)
  async likeFilm(user: User, friendId: number): Promise<void> {
    // TODO: Connect film with user
  }

  async becomeFriendsWith({ user, friend }: { user: User, friend: User }): Promise<void> {
    // TODO: connect with another user
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
