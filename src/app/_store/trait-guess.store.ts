import { BaseComponent } from "./../components/base.component";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map, takeUntil } from "rxjs";
import { ILastChampion } from "../_models/models";
import { TraitGuessService } from "../_services/trait-guess.service";

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

export interface ITrait {
  label: string;
  imagePath: string;
}

export interface IGuess {
  correct: boolean;
  trait: ITrait;
}

@Injectable({
  providedIn: "root",
})
export class TraitGuessStore extends BaseComponent {
  private guessChampion$ = this.traitGuessService.getTraitGuessChampion();
  private lastChampion$ = this.traitGuessService.getLastChampion();

  private guesses$ = new BehaviorSubject<IGuess[]>([]);
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
    return this.guessChampion$;
  }
  getGuesses$() {
    return this.guesses$.asObservable();
  }
  getLastChampion$() {
    return this.lastChampion$;
  }
  generateStatClue() {
    this.traitGuessService
      .getStatClue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clue) => this.statClue$.next(clue));
  }
  generateSameTraitClue() {
    this.traitGuessService
      .getSameTraitClue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clue) => this.sameTraitClue$.next(clue));
  }
  checkGuess(trait: ITrait) {
    this.traitGuessService
      .checkGuess(trait)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
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
