import { BaseStore } from "./base.store";
import { traitGuessRoutes } from "./../_constants/endpoints.contants";
import {
  IStatClue,
  ITrait,
  ITraitGuess,
  ITraitGuessChampion,
} from "./../_models/models";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, takeUntil } from "rxjs";
import { TraitGuessService } from "../_services/trait-guess.service";

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
    this.traitGuessService
      .getLastChampion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((champion) => {
        this.removeLoadingEndpoint(traitGuessRoutes.lastChampion);
        this.lastChampion$.next(champion);
      });
  }
  fetchGuessChampion() {
    this.traitGuessService
      .getTraitGuessChampion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((champion) => {
        this.removeLoadingEndpoint(traitGuessRoutes.champion);
        this.guessChampion$.next(champion);
      });
  }
  generateStatClue() {
    this.traitGuessService
      .getStatClue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clue) => {
        this.removeLoadingEndpoint(traitGuessRoutes.statClue);
        this.statClue$.next(clue);
      });
  }
  generateSameTraitClue() {
    this.traitGuessService
      .getSameTraitClue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clue) => {
        this.removeLoadingEndpoint(traitGuessRoutes.sameTraitClue);
        this.sameTraitClue$.next(clue);
      });
  }
  checkGuess(trait: ITrait) {
    this.traitGuessService
      .checkGuess(trait)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.removeLoadingEndpoint(traitGuessRoutes.checkGuess);
        this.guesses$.next([
          ...this.guesses$.getValue(),
          {
            correct: response.correct,
            trait: response.guess,
          },
        ]);
        if (response.correct && response.needed) {
          if (
            this.guesses$.getValue().filter((g) => g.correct).length >=
            response.needed
          ) {
            this.finished$.next(true);
          }
        }
      });
  }
}
