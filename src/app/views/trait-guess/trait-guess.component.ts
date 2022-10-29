import { debounceTime, Subject, filter, Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  ITrait,
  TraitGuessService,
} from "src/app/_services/trait-guess.service";
import { trigger } from "@angular/animations";
import { inOut } from "src/app/_animations/animations";
import { ILastChampion } from "src/app/_models/models";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-trait-guess",
  templateUrl: "./trait-guess.component.html",
  styleUrls: ["trait-guess.component.scss"],
  animations: [trigger("inOutAnimation", inOut)],
})
export class TraitGuessComponent implements OnInit {
  constructor(
    private traitGuessService: TraitGuessService,
    private clipboard: Clipboard
  ) {}

  randomChampion$ = this.traitGuessService.randomChampion$;
  results$ = this.traitGuessService.traitQueryResults$;
  sameTraitClue$ = this.traitGuessService.sameTraitClue$;
  statClue$ = this.traitGuessService.statClue$;
  correctGuesses$ = this.traitGuessService.correctGuesses$;
  wrongGuesses$ = this.traitGuessService.wrongGuesses$;
  finished$ = this.traitGuessService.finished$;
  guessCount$ = this.traitGuessService.guessCount$;
  errorMessage$ = this.traitGuessService.errorMessage$;
  traitClueCounter$ = this.traitGuessService.traitClueCounter$;
  statClueCounter$ = this.traitGuessService.statClueCounter$;
  lastChampion$!: Observable<ILastChampion>;
  selectedTrait?: ITrait;

  query$ = new Subject<string>();
  query = "";
  showResults = false;

  ngOnInit(): void {
    this.traitGuessService.getTraitGuessChampion();
    this.query$
      .pipe(
        debounceTime(200),
        filter((query) => !!query)
      )
      .subscribe((query) => this.traitGuessService.queryTraits(query));
    this.lastChampion$ = this.traitGuessService.getLastChampion();
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

  copyShareLink() {
    this.clipboard.copy(
      `I found the Tftordle guess trait's in ${this.guessCount$.getValue()} tries. https://www.tftordle.com/`
    );
  }
}
