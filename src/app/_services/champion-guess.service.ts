import { ITrait } from './trait-guess.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface IChampionGuessChampion {
  id: string;
  name: string;
  set: number;
  traitCount: number;
  imagePath?: string;
  cost: number;
  traits: ITrait[];
}

export interface IChampionGuessResponse{
  correct: boolean;
  invalidChampion?: boolean;
}

export type Match = 'exact' | 'higher' | 'lower' | "wrong" | "some";

@Injectable({
  providedIn: 'root',
})
export class ChampionGuessService {
  wrongGuesses$ = new BehaviorSubject<IChampionGuessChampion[]>([]);
  championQueryResults$ = new BehaviorSubject<IChampionGuessChampion[]>([]);
  finished$ = new BehaviorSubject<boolean>(false);
  errorMessage$ = new BehaviorSubject<string | undefined>(undefined);
  guessCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  queryChampions(query: string) {
    this.http
      .get<IChampionGuessChampion[]>(environment.apiUrl + '/query-champions/' + query)
      .subscribe((results) =>
        this.championQueryResults$.next(
          results.filter(
            (result) => !this.wrongGuesses$.getValue().map(r => r.id).includes(result.id)
          )
        )
      );
  }

  checkGuess(guess: IChampionGuessChampion){
    this.http
      .get<IChampionGuessResponse>(environment.apiUrl + '/check-champion-guess/' + guess.id)
      .subscribe((guessResponse) => {
        this.championQueryResults$.next([]);

        if(guessResponse.correct){
          this.finished$.next(true);
        }else{
          this.wrongGuesses$.next([
            ...this.wrongGuesses$.getValue(),
            guess,
          ]);
        }
        this.guessCount$.next(this.guessCount$.getValue() + 1);
      });
  }
}
