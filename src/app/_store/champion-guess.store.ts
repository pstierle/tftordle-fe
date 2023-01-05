import { IChampionGuessResult } from "./../_models/models";
import { BaseStore } from "./base.store";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { ChampionGuessService } from "../_services/champion-guess.service";
import { IChampionGuessChampion, ILastChampion } from "../_models/models";

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
    this.championGuessService
      .getLastChampion()
      .subscribe(({ endpoint, data }) => {
        this.removeLoadingEndpoint(endpoint);
        this.lastChampion$.next(data);
      });
  }
  generateTraitClue() {
    this.championGuessService.getTraitClue().subscribe(({ endpoint, data }) => {
      this.removeLoadingEndpoint(endpoint);
      this.traitClue$.next(data);
    });
  }
  getGuessCount$() {
    return this.guesses$.pipe(map((guesses) => guesses.length));
  }
  checkGuess(champion: IChampionGuessChampion) {
    this.championGuessService
      .checkGuess(champion)
      .subscribe(({ endpoint, data }) => {
        this.removeLoadingEndpoint(endpoint);
        this.guesses$.next([
          {
            ...champion,
            traits: data.find((r) => r.attribute === "traits")?.value,
            results: data,
          },
          ...this.guesses$.getValue(),
        ]);
      });
  }
}
