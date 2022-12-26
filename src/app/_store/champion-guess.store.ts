import { championGuessRoutes } from "./../_constants/endpoints.contants";
import { BaseStore } from "./base.store";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, takeUntil } from "rxjs";
import { ChampionGuessService } from "../_services/champion-guess.service";
import { IChampionGuessChampion, ILastChampion } from "../_models/models";
import { IBaseResponse } from "../_services/base-api.service";

@Injectable({
  providedIn: "root",
})
export class ChampionGuessStore extends BaseStore {
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
  setFinished(finished: boolean) {
    this.finished$.next(finished);
  }
  fetchLastChampion() {
    this.championGuessService.getLastChampion().subscribe((champion) => {
      this.lastChampion$.next(champion);
      this.removeLoadingEndpoint(championGuessRoutes.lastChampion);
    });
  }
  generateTraitClue() {
    this.championGuessService.getTraitClue().subscribe((clue) => {
      this.removeLoadingEndpoint(championGuessRoutes.traitClue);
      this.traitClue$.next(clue);
    });
  }
  getGuessCount$() {
    return this.guesses$.pipe(map((guesses) => guesses.length));
  }
  checkGuess(champion: IChampionGuessChampion) {
    this.championGuessService.checkGuess(champion).subscribe((results) => {
      this.removeLoadingEndpoint(championGuessRoutes.checkGuess);
      this.guesses$.next([
        {
          ...champion,
          traits: results.find((r) => r.attribute === "traits")?.value,
          results: results,
        },
        ...this.guesses$.getValue(),
      ]);
    });
  }
}
