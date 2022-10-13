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
    if (query === '') {
      this.results$.next([]);
    }
  }

  selectGuess(result: IChampionGuessChampion) {
    this.query = result.name + "-" + result.set;
    this.results$.next([]);
    this.query$.next('');
    this.selectedChampion = result;
  }

  handleClickOutSide() {
    this.results$.next([]);
  }

  guess(){
    if(!this.selectedChampion){
      this.errorMessage$.next("Select a valid Champion")
      return
    }
    this.results$.next([]);
    this.guesses$.next([
      ...this.guesses$.getValue(),
      this.selectedChampion,
    ]);
    this.guessCount$.next(this.guessCount$.getValue() + 1);
    this.selectedChampion = undefined;
    this.query = "";
  }
}
