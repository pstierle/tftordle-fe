import { BaseComponent } from "./../../../components/base.component";
import { takeUntil, tap } from "rxjs";
import { ChampionGuessStore } from "./../../../_store/champion-guess.store";
import { Component, OnInit } from "@angular/core";
import { championGuessRoutes } from "src/app/_constants/endpoints.contants";

@Component({
  selector: "app-guess-clues",
  templateUrl: "./guess-clues.component.html",
  styleUrls: [],
})
export class GuessCluesComponent extends BaseComponent implements OnInit {
  constructor(private championGuessStore: ChampionGuessStore) {
    super();
  }

  guessCount: number = 0;
  traitClueThreshold = this.championGuessStore.traitClueThreshold;
  traitClue$ = this.championGuessStore.getTraitClue$();
  traitClueLoading$ = this.championGuessStore.isEndpointLoading$(
    championGuessRoutes.traitClue
  );

  ngOnInit(): void {
    this.championGuessStore
      .getGuessCount$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.guessCount = count;
        if (count >= this.traitClueThreshold) {
          this.championGuessStore.generateTraitClue();
        }
      });
  }

  get clueLabel() {
    return `Trait Clue in ${
      this.championGuessStore.traitClueThreshold - this.guessCount
    } tries`;
  }
}
