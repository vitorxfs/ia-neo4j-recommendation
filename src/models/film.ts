import { omitBy, isNil } from 'lodash';

interface FilmAttributes {
  directorName?: string;
  id: number;
  genres?: string[];
  name: string;
  releaseYear?: number;
}

export class Film {
  directorName?: string;
  id: number;
  genres?: string[];
  name: string;
  releaseYear?: number;

  constructor({
    directorName,
    id,
    genres,
    name,
    releaseYear,
  }: FilmAttributes) {
    this.directorName = directorName;
    this.id = id;
    this.genres = genres;
    this.name = name;
    this.releaseYear = releaseYear;
  }

  toJSON(): Record<string, any> {
    return omitBy({
      directorName: this.directorName,
      id: this.id,
      genres: this.genres,
      name: this.name,
      releaseYear: this.releaseYear,
    }, isNil)
  };
}
