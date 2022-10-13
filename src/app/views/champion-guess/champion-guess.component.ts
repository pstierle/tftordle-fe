import {
  ChampionGuessService,
  IChampion,
} from './../../_services/champion-guess.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, filter, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

type match = 'exact' | 'higher' | 'lower';

@Component({
  selector: 'app-champion-guess',
  templateUrl: './champion-guess.component.html',
  styleUrls: [],
})
export class ChampionGuessComponent implements OnInit {
  constructor(private championGuessService: ChampionGuessService) {}

  displayClue = false;
  clueCounter = 6;
  finished = false;

  query$ = new Subject<string>();
  query: string = '';
  results$ = this.championGuessService.championQueryResults$;
  wrongGuesses$ = this.championGuessService.wrongGuesses$;
  randomChampion$ = this.championGuessService.randomChampion$;
  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.championGuessService.reset();
    this.championGuessService.getChampionGuessChampion();
    this.query$
      .pipe(
        debounceTime(200),
        filter((query) => !!query)
      )
      .subscribe((query) => this.championGuessService.queryChampions(query));

    this.wrongGuesses$.subscribe(() => {
      if (!this.displayClue) {
        this.clueCounter -= 1;
        if (this.clueCounter === 0) {
          this.displayClue = true;
        }
      }
    });
  }

  handleChange(query: string) {
    this.query$.next(query);

    if (query === '') {
      this.results$.next([]);
    }
  }

  guess(championId: string) {
    if (championId === this.randomChampion$.getValue()?.id) {
      this.finished = true;
    } else {
      const champion = this.results$
        .getValue()
        ?.find((c) => c.id === championId);
      if (champion)
        this.wrongGuesses$.next([...this.wrongGuesses$.getValue(), champion]);
    }

    this.results$.next(
      this.results$.getValue().filter((result) => result.id !== championId)
    );
  }

  setMatching(champion: IChampion): match | undefined {
    const set = this.randomChampion$.getValue()?.set;

    if (!set) return undefined;

    return champion.set === set
      ? 'exact'
      : champion.set < set
      ? 'higher'
      : 'lower';
  }

  traitCountMatching(champion: IChampion): match | undefined {
    const traitCount = this.randomChampion$.getValue()?.traitCount;

    if (!traitCount) return undefined;

    return champion.traitCount === traitCount
      ? 'exact'
      : champion.traitCount < traitCount
      ? 'higher'
      : 'lower';
  }

  firstApperanceMatching(champion: IChampion): match | undefined {
    const firstApperance = this.randomChampion$.getValue()?.firstApperance;

    if (!firstApperance) return undefined;

    console.log(firstApperance, champion.firstApperance);

    return champion.firstApperance === firstApperance
      ? 'exact'
      : champion.firstApperance < firstApperance
      ? 'higher'
      : 'lower';
  }
}
