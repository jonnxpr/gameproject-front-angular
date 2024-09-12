import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../app/models/game.model';
import { endpoints } from '../enviroments/endpoints';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  // Método GET para recuperar os jogos
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(endpoints.games.findAll);
  }

  // // Método POST para adicionar um novo jogo
  // addGame(gameData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, gameData);
  // }

  // Método DELETE para remover um jogo
  deleteGame(ids: number[]): Observable<number[]> {
    return this.http.delete<any>(`${endpoints.games.deleteGame}`, { body: ids });
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(endpoints.games.deleteAll);
  }

  populateDatabase(): Observable<any> {
    return this.http.post<any>(endpoints.games.populateDatabase, null);
  }

  // // Método PUT para atualizar um jogo
  // updateGame(gameId: string, gameData: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${gameId}`, gameData);
  // }
}
