import { ILastChampion } from "src/app/_models/models";
import { BaseStore } from "./base.store";
import { traitGuessRoutes } from "./../_constants/endpoints.contants";
import {
  IStatClue,
  ITrait,
  ITraitGuess,
  ITraitGuessChampion,
  ITraitGuessResult,
} from "./../_models/models";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, takeUntil, Observable, of } from "rxjs";
import { TraitGuessService } from "../_services/trait-guess.service";
import { IBaseResponse } from "../_services/base-api.service";

@Injectable({
  providedIn: "root",
})
export class TraitGuessStore extends BaseStore {
  private guessChampion$ = new BehaviorSubject<ITraitGuessChampion | undefined>(
    undefined
  );

  private guesses$ = new BehaviorSubject<ITraitGuess[]>([]);
  private finished$ = new BehaviorSubject<boolean>(false);

  private sameTraitClue$ = new BehaviorSubject<string[] | undefined>(undefined);
  private statClue$ = new BehaviorSubject<IStatClue | undefined>(undefined);

  readonly statClueThreshold = 3;
  readonly sameTraitClueThreshold = 6;

  constructor(private traitGuessService: TraitGuessService) {
    super();
  }

  getStatClue$() {
    return this.statClue$.asObservable();
  }
  getSameTraitClue$() {
    return this.sameTraitClue$.asObservable();
  }
  getFinished$() {
    return this.finished$.asObservable();
  }
  getCorrectGuesses$() {
    return this.guesses$.pipe(
      map((guesses) => guesses.filter((g) => g.correct).map((g) => g.trait))
    );
  }
  getWrongGuesses$() {
    return this.guesses$.pipe(
      map((guesses) => guesses.filter((g) => !g.correct).map((g) => g.trait))
    );
  }
  getGuessChampion$() {
    return this.guessChampion$.asObservable();
  }
  getGuesses$() {
    return this.guesses$.asObservable();
  }

  fetchLastChampion() {
    this.traitGuessService.getLastChampion().subscribe(({ endpoint, data }) => {
      this.removeLoadingEndpoint(endpoint);
      this.lastChampion$.next(data);
    });
  }
  fetchGuessChampion() {
    this.traitGuessService
      .getTraitGuessChampion()
      .subscribe(({ endpoint, data }) => {
        this.removeLoadingEndpoint(endpoint);
        this.guessChampion$.next(data);
      });
  }
  generateStatClue() {
    this.traitGuessService.getStatClue().subscribe(({ endpoint, data }) => {
      this.removeLoadingEndpoint(endpoint);
      this.statClue$.next(data);
    });
  }
  generateSameTraitClue() {
    this.traitGuessService
      .getSameTraitClue()
      .subscribe(({ endpoint, data }) => {
        this.removeLoadingEndpoint(endpoint);
        this.sameTraitClue$.next(data);
      });
  }
  checkGuess(trait: ITrait) {
    this.traitGuessService.checkGuess(trait).subscribe(({ endpoint, data }) => {
      this.removeLoadingEndpoint(endpoint);
      this.guesses$.next([
        ...this.guesses$.getValue(),
        {
          correct: data.correct,
          trait: data.guess,
        },
      ]);
      if (data.correct && data.needed) {
        if (
          this.guesses$.getValue().filter((g) => g.correct).length >=
          data.needed
        ) {
          this.finished$.next(true);
        }
      }
    });
  }
}
