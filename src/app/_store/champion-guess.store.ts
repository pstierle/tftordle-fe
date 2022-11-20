import { BaseComponent } from "./../components/base.component";
import { Injectable } from "@angular/core";
import { BehaviorSubject, takeUntil } from "rxjs";
import { ChampionGuessService } from "../_services/champion-guess.service";
import { IChampionGuessChampion } from "../_models/models";

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
  generateTraitClue() {
    this.championGuessService
      .getTraitClue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clue) => this.traitClue$.next(clue));
  }
}
