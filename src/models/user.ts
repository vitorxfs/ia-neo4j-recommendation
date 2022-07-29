import { Driver } from 'neo4j-driver';

export class User {
  id: number;
  name: string;

  constructor({ name, id }: { name: string, id: number }) {
    this.id = id;
    this.name = name;
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
