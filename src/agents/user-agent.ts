import { Driver, QueryResult } from 'neo4j-driver';
import { Film } from '../models/film';
import { User } from '../models/user';

export class UserAgent {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async create({ name }: { name: string }): Promise<User> {
    const user = { name };

    const query = 'CREATE (n:User {name: "' + name + '"}) RETURN n';
    const session = this.driver.session();
    const result = await session.run(query);

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    return new User({
      name: node.properties.name,
      id: node.identity.low,
    });
  }

  async findUserById(id: number): Promise<User> {
    const query = 'MATCH (n) WHERE id(n) = ' + id + ' RETURN n';

    const result = await this.runQuery(query);

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    return new User({
      name: node.properties.name,
      id: node.identity.low,
    });
  }

  // Para criar relações entre nós (exemplo): MATCH (a:User), (b:User) CREATE (a)-[r:RELACAO]->(b)
  async likeFilm(user: User, filmId: number): Promise<void> {
    const query = `
      MATCH (a: User), (b: Movie)
      WHERE id(a) = ${user.id} AND id(b) = ${filmId}
      CREATE (a)-[r:LIKES]->(b)
    `

    await this.runQuery(query);
  }

  async becomeFriendsWith({ user, friend }: { user: User, friend: User }): Promise<void> {
    const query = `
      MATCH (a: User), (b: User)
      WHERE id(a) = ${user.id} AND id(b) = ${friend.id}
      CREATE (a)-[r:FRIENDS_WITH]->(b)
    `;

    await this.runQuery(query);
  }

  private runQuery(query: string): Promise<QueryResult> {
    const session = this.driver.session();

    return session.run(query);
  }
}
