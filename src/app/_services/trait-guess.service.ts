import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface ITraitGuessChampion {
  name: string;
  set: number;
  imagePath: string;
}

export interface IStatClue {
  cost: number;
  oneTraitStartsWith: string;
  traitCount: number;
}

export interface IGuessResponse {
  correct: boolean;
  needed?: number;
  guess?: ITrait;
}

export interface ITrait {
  label: string;
  imagePath: string;
}

@Injectable({
  providedIn: 'root',
})
export class TraitGuessService {
  randomChampion$ = new BehaviorSubject<ITraitGuessChampion | undefined>(
    undefined
  );
  sameTraitClue$ = new BehaviorSubject<string[]>([]);
  statClue$ = new BehaviorSubject<IStatClue | undefined>(undefined);
  correctGuesses$ = new BehaviorSubject<ITrait[]>([]);
  wrongGuesses$ = new BehaviorSubject<ITrait[]>([]);
  traitQueryResults$ = new BehaviorSubject<ITrait[]>([]);
  finished$ = new BehaviorSubject<boolean>(false);
  guessCount$ = new BehaviorSubject<number>(0);
  errorMessage$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient) {}

  getTraitGuessChampion() {
    this.http
      .get<ITraitGuessChampion>(environment.apiUrl + '/trait-guess-champion')
      .subscribe((champion) => this.randomChampion$.next(champion));
  }

  queryTraits(query: string) {
    this.http
      .get<ITrait[]>(environment.apiUrl + '/query-traits/' + query)
      .subscribe((results) =>
        this.traitQueryResults$.next(
          results.filter(
            (result) =>
              ![
                ...this.correctGuesses$.getValue().map((g) => g.label),
                ...this.wrongGuesses$.getValue().map((g) => g.label),
              ].includes(result.label)
          )
        )
      );
  }

  getSameTraitClue() {
    this.http
      .get<string[]>(environment.apiUrl + '/same-trait-clue/')
      .subscribe((clues) => this.sameTraitClue$.next(clues));
  }

  getStatClue() {
    this.http
      .get<IStatClue>(environment.apiUrl + '/stat-clue/')
      .subscribe((statClue) => this.statClue$.next(statClue));
  }

  checkGuess(guessLabel: string) {
    if([
      ...this.correctGuesses$.getValue().map((g) => g.label),
      ...this.wrongGuesses$.getValue().map((g) => g.label),
    ].includes(guessLabel.replace(/ /g, ""))){
      this.errorMessage$.next("You already guessed this Trait!");
      return;
    }

    if(!guessLabel){
      this.errorMessage$.next("Select a valid Trait!");
      return;
    }

    this.http
      .get<IGuessResponse>(environment.apiUrl + '/check-guess/' + guessLabel)
      .subscribe((guessResponse) => {
        if(!guessResponse.guess){
          this.errorMessage$.next("Select a valid Trait!");
          return;
        }

        this.guessCount$.next(this.guessCount$.getValue() + 1);

        if (guessResponse.correct) {
          this.correctGuesses$.next([
            ...this.correctGuesses$.getValue(),
            guessResponse.guess,
          ]);
          if (this.correctGuesses$.getValue().length === guessResponse.needed) {
            this.finished$.next(true);
          }
        } else {
          this.wrongGuesses$.next([
            ...this.wrongGuesses$.getValue(),
            guessResponse.guess,
          ]);
        }

        this.traitQueryResults$.next([]);
      });
  }
}
