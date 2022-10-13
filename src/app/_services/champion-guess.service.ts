import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface IChampion {
  id: string;
  name: string;
  set: number;
  traitCount: number;
  imageName?: string;
  cost: number;
  firstApperance: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChampionGuessService {
  randomChampion$ = new BehaviorSubject<IChampion | undefined>(undefined);
  wrongGuesses$ = new BehaviorSubject<IChampion[]>([]);
  championQueryResults$ = new BehaviorSubject<IChampion[]>([]);

  constructor(private http: HttpClient) {}

  getChampionGuessChampion() {
    this.http
      .get<IChampion>(environment.apiUrl + '/champion-guess-champion')
      .subscribe((champion) => this.randomChampion$.next(champion));
  }

  queryChampions(query: string) {
    this.http
      .get<IChampion[]>(environment.apiUrl + '/query-champions/' + query)
      .subscribe((results) =>
        this.championQueryResults$.next(
          results.filter(
            (result) =>
              ![...this.wrongGuesses$.getValue().map((c) => c.name)].includes(
                result.name
              )
          )
        )
      );
  }

  reset() {
    this.wrongGuesses$.next([]);
    this.championQueryResults$.next([]);
  }
}
