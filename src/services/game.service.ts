import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../app/models/game.model';
import { Response } from '../app/models/response.model';
import { endpoints } from '../enviroments/endpoints';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  // Método GET para recuperar os jogos
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(endpoints.games.findAll);
  }

  // Método POST para adicionar um novo jogo
  saveGame(gameData: Game): Observable<Response> {
    return this.http.post<Response>(endpoints.games.saveGame, gameData);
  }

  // Método DELETE para remover um jogo
  deleteGame(ids: number[]): Observable<Response> {
    return this.http.delete<Response>(endpoints.games.deleteGame, { body: ids });
  }

  deleteAll(): Observable<Response> {
    return this.http.delete<Response>(endpoints.games.deleteAll);
  }

  populateDatabase(): Observable<Response> {
    return this.http.post<Response>(endpoints.games.populateDatabase, null);
  }
}
