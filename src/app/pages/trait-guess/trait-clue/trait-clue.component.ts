import { BaseComponent } from "./../../../components/base.component";
import { Component, OnInit } from "@angular/core";
import { TraitGuessStore } from "src/app/_store/trait-guess.store";
import { map, takeUntil } from "rxjs";

@Component({
  selector: "app-trait-clue",
  templateUrl: "./trait-clue.component.html",
  styleUrls: [],
})
export class TraitClueComponent extends BaseComponent implements OnInit {
  constructor(private store: TraitGuessStore) {
    super();
  }

  sameTraitClue$ = this.store.getSameTraitClue$();
  statClue$ = this.store.getStatClue$();
  wrongGuesses = this.store.getWrongGuesses$();

  showClues = {
    stat: false,
    trait: false,
  };

  wrongGuessCount: number = 0;

  ngOnInit(): void {
    this.wrongGuesses.pipe(takeUntil(this.destroy$)).subscribe((guesses) => {
      if (
        guesses.length >= this.store.statClueThreshold &&
        !this.showClues.stat
      ) {
        this.store.generateStatClue();
        this.showClues.stat = true;
      }
      if (
        guesses.length >= this.store.sameTraitClueThreshold &&
        !this.showClues.trait
      ) {
        this.store.generateSameTraitClue();
        this.showClues.trait = true;
      }
      this.wrongGuessCount = guesses.length;
    });
  }
}
