import { omitBy, isNil } from 'lodash';

interface FilmAttributes {
  directorName?: string;
  id: number;
  genre?: string;
  name: string;
  releaseYear?: number;
}

export class Film {
  directorName?: string;
  id: number;
  genre?: string;
  name: string;
  releaseYear?: number;

  constructor({
    directorName,
    id,
    genre,
    name,
    releaseYear,
  }: FilmAttributes) {
    this.directorName = directorName;
    this.id = id;
    this.genre = genre;
    this.name = name;
    this.releaseYear = releaseYear;
  }

  toJSON(): Record<string, any> {
    return omitBy({
      directorName: this.directorName,
      id: this.id,
      genre: this.genre,
      name: this.name,
      releaseYear: this.releaseYear,
    }, isNil)
  };
}
