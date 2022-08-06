import { Driver, QueryResult } from 'neo4j-driver';
import { Film } from '../models/film';
import { User } from '../models/user';

export class FilmAgent {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async findRecommendations(
    user: User,
    { limit }: { limit?: number } = { limit: 5 }
  ): Promise<Film[]> {
    const query = `
      CALL {
        MATCH (u:User)-[r:FRIENDS_WITH]->(f:User)-[:LIKES]->(m:Movie)
        WHERE id(u) = ${user.id}
        RETURN m

        UNION ALL

        MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(p:Person)-[]->(m:Movie)
        WHERE id(u) = ${user.id}
        RETURN m

        UNION ALL

        MATCH (u:User)-[:LIKES]->(m1:Movie)<-[]-(g:Genre)-[]->(m:Movie)
        WHERE id(u) = ${user.id}
        RETURN m
      }
      RETURN m, count(m) AS occurrence
      ORDER BY occurrence DESC
      LIMIT ${limit}
    `;

    const result = await this.runQuery(query);

    return result.records.map((node) => {
      const film = node.get(0);

      return this.filmFromJSON(film);
    });
  }

  private filmFromJSON(json: any): Film {
    return new Film({
      id: json.identity.low,
      name: json.properties.title,
      directorName: json.properties.director,
      genre: json.properties.genre,
      releaseYear: json.properties.released.low,
    });
  }

  private runQuery(query: string): Promise<QueryResult> {
    const session = this.driver.session();

    return session.run(query);
  }
}
