import { debounceTime, Subject, filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  ITrait,
  TraitGuessService,
} from 'src/app/_services/trait-guess.service';

@Component({
  selector: 'app-trait-guess',
  templateUrl: './trait-guess.component.html',
  styleUrls: ['trait-guess.component.scss'],
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

  query$ = new Subject<string>();
  query = '';
  wrongGuess = false;

  traitClueCounter = 6;
  displayTraitClue = false;

  statClueCounter = 3;
  displayStatClue = false;

  ngOnInit(): void {
    this.traitGuessService.getTraitGuessChampion();
    this.query$
      .pipe(
        debounceTime(200),
        filter((query) => !!query)
      )
      .subscribe((query) => this.traitGuessService.queryTraits(query));

    this.wrongGuesses$.subscribe((guesses) => {
      if (guesses.length > 0) {
        this.wrongGuess = false;
        this.wrongGuess = true;
      }
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
    this.wrongGuess = false;
    this.query$.next(query);
    this.query = query;
    this.errorMessage$.next(undefined);

    if (query === '') {
      this.results$.next([]);
    }
  }

  guess() {
    this.traitGuessService.checkGuess(this.query);
    this.results$.next([]);
  }

  selectGuess(result: ITrait) {
    this.query = result.label;
    this.results$.next([]);
    this.query$.next('');
  }

  handleClickOutSide() {
    this.results$.next([]);
  }
}
