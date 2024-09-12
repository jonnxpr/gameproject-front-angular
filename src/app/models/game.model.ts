export class Game {
  id: number;
  name: string;
  genre: string;
  platform: string;
  releaseDate: string;
  company: string;
  description: string;

  constructor(
    id: number,
    name: string,
    genre: string,
    platform: string,
    releaseDate: string,
    company: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.platform = platform;
    this.releaseDate = releaseDate;
    this.company = company;
    this.description = description;
  }
}
