import { debounceTime, Subject, filter } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  ITrait,
  TraitGuessService,
} from "src/app/_services/trait-guess.service";
import { trigger } from "@angular/animations";
import { inOut } from "src/app/_animations/animations";

@Component({
  selector: "app-trait-guess",
  templateUrl: "./trait-guess.component.html",
  styleUrls: ["trait-guess.component.scss"],
  animations: [trigger("inOutAnimation", inOut)],
})
export class TraitGuessComponent implements OnInit {
  constructor(private traitGuessService: TraitGuessService) {}

  randomChampion$ = this.traitGuessService.randomChampion$;
  results$ = this.traitGuessService.traitQueryResults$;
  sameTraitClue$ = this.traitGuessService.sameTraitClue$;
  statClue$ = this.traitGuessService.statClue$;
  correctGuesses$ = this.traitGuessService.correctGuesses$;
  wrongGuesses$ = this.traitGuessService.wrongGuesses$;
  finished$ = this.traitGuessService.finished$;
  guessCount$ = this.traitGuessService.guessCount$;
  errorMessage$ = this.traitGuessService.errorMessage$;

  selectedTrait?: ITrait;

  query$ = new Subject<string>();
  query = "";

  traitClueCounter = 6;
  displayTraitClue = false;

  statClueCounter = 3;
  displayStatClue = false;

  showResults = false;

  ngOnInit(): void {
    this.traitGuessService.getTraitGuessChampion();
    this.query$
      .pipe(
        debounceTime(200),
        filter((query) => !!query)
      )
      .subscribe((query) => this.traitGuessService.queryTraits(query));

    this.wrongGuesses$.subscribe(() => {
      if (!this.displayTraitClue) {
        this.traitClueCounter -= 1;
        if (this.traitClueCounter === 0) {
          this.displayTraitClue = true;
          this.traitGuessService.getSameTraitClue();
        }
      }
      if (!this.displayStatClue) {
        this.statClueCounter -= 1;
        if (this.statClueCounter === 0) {
          this.displayStatClue = true;
          this.traitGuessService.getStatClue();
        }
      }
    });
  }

  handleChange(query: string) {
    this.query$.next(query);
    this.query = query;
    this.errorMessage$.next(undefined);
    this.selectedTrait = undefined;
  }

  guess() {
    if (this.selectedTrait) {
      this.traitGuessService.checkGuess(this.selectedTrait);
      this.showResults = false;
      this.selectedTrait = undefined;
      this.query = "";
    }
  }

  handleFocus() {
    this.showResults = true;
  }

  selectGuess(result: ITrait) {
    this.query = result.label;
    this.selectedTrait = result;
    this.showResults = false;
  }

  handleClickOutSide() {
    this.showResults = false;
  }
}
