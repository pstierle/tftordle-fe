import {
  ChampionGuessService, IChampionGuessChampion,
} from './../../_services/champion-guess.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, filter, Subject } from 'rxjs';

type match = 'exact' | 'higher' | 'lower';

@Component({
  selector: 'app-champion-guess',
  templateUrl: './champion-guess.component.html',
  styleUrls: [],
})
export class ChampionGuessComponent implements OnInit {
  constructor(private championGuessService: ChampionGuessService) {}

  query$ = new Subject<string>();
  query: string = '';
  selectedChampion? : IChampionGuessChampion = undefined;
  results$ = this.championGuessService.championQueryResults$;
  guesses$ = this.championGuessService.guesses$;
  finished$ = this.championGuessService.finished$;
  guessCount$ = this.championGuessService.guessCount$;
  errorMessage$ = this.championGuessService.errorMessage$;
  showResults = false;

  ngOnInit(): void {
    this.query$
      .pipe(
        debounceTime(200),
        filter((query) => !!query)
      )
      .subscribe((query) => this.championGuessService.queryChampions(query));
  }

  handleChange(query: string) {
    this.query$.next(query);
    this.selectedChampion = undefined;
  }

  selectGuess(result: IChampionGuessChampion) {
    this.query = result.name + " - Set: " + result.set;
    this.selectedChampion = result;
    this.showResults = false;
  }

  handleClickOutSide() {
    this.showResults = false;
  }

  handleFocus(){
    this.showResults = true;
  }

  guess(){
    if(this.selectedChampion){
      this.showResults = false;
      this.guesses$.next([
        ...this.guesses$.getValue(),
        this.selectedChampion,
      ]);
      this.results$.next(
        this.results$.getValue().filter(
          (result) =>
            !this.guesses$
              .getValue()
              .map((r) => r.id)
              .includes(result.id)
        )
      );
      this.guessCount$.next(this.guessCount$.getValue() + 1);
      this.selectedChampion = undefined;
      this.query = "";
      }
  }
}
