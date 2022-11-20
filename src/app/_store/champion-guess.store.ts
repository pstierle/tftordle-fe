import { BaseComponent } from "./../components/base.component";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, takeUntil } from "rxjs";
import { ChampionGuessService } from "../_services/champion-guess.service";
import {
  IChampionGuessChampion,
  IChampionGuessResult,
} from "../_models/models";

@Injectable({
  providedIn: "root",
})
export class ChampionGuessStore extends BaseComponent {
  private lastChampion$ = this.championGuessService.getLastChampion();
  private guesses$ = new BehaviorSubject<IChampionGuessChampion[]>([]);
  private finished$ = new BehaviorSubject<boolean>(false);
  private traitClue$ = new BehaviorSubject<string[]>([]);

  readonly traitClueThreshold = 3;

  constructor(private championGuessService: ChampionGuessService) {
    super();
  }

  getTraitClue$() {
    return this.traitClue$.asObservable();
  }
  getFinished$() {
    return this.finished$.asObservable();
  }
  getGuesses$() {
    return this.guesses$.asObservable();
  }
  getLastChampion$() {
    return this.lastChampion$;
  }
  setFinished(finished: boolean) {
    this.finished$.next(finished);
  }
  generateTraitClue() {
    this.championGuessService
      .getTraitClue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clue) => this.traitClue$.next(clue));
  }
  getGuessCount$() {
    return this.guesses$.pipe(map((guesses) => guesses.length));
  }
  checkGuess(champion: IChampionGuessChampion) {
    this.championGuessService
      .checkGuess(champion)
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.guesses$.next([
          {
            ...champion,
            traits: results.find((r) => r.attrLabel === "traits")
              ?.userGuessValue,
            results: results,
          },
          ...this.guesses$.getValue(),
        ]);
      });
  }
}
