import { championGuessRoutes } from "./../../_constants/endpoints.contants";
import { BaseComponent } from "./../../components/base.component";
import { ChampionGuessService } from "./../../_services/champion-guess.service";
import { Component, OnInit } from "@angular/core";
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  takeUntil,
} from "rxjs";
import { trigger } from "@angular/animations";
import { inOut } from "src/app/_animations/animations";
import {
  IChampionGuessChampion,
  IChampionGuessResult,
} from "src/app/_models/models";
import { ChampionGuessStore } from "src/app/_store/champion-guess.store";

@Component({
  selector: "app-champion-guess",
  templateUrl: "./champion-guess.page.html",
  styleUrls: ["./champion-guess.page.scss"],
  animations: [trigger("inOutAnimation", inOut)],
})
export class ChampionGuessPage extends BaseComponent implements OnInit {
  constructor(
    private championGuessService: ChampionGuessService,
    private championGuessStore: ChampionGuessStore
  ) {
    super();
  }

  query$ = new Subject<string>();
  selectedChampion?: IChampionGuessChampion = undefined;
  displayedColumns: string[] = ["champion", "set", "cost", "range", "traits"];
  lastChampion$ = this.championGuessStore.getLastChampion$();
  guesses: IChampionGuessChampion[] = [];
  finished$ = this.championGuessStore.getFinished$();
  results$: Observable<IChampionGuessChampion[]> = of([]);
  championGuessRoutes = championGuessRoutes;
  lastChampionLoading$ = this.championGuessStore.isEndpointLoading$(
    championGuessRoutes.lastChampion
  );
  resultsLoading$ = this.championGuessStore.isEndpointLoading$(
    championGuessRoutes.queryChampions
  );
  guessLoading$ = this.championGuessStore.isEndpointLoading$(
    championGuessRoutes.checkGuess
  );
  ngOnInit(): void {
    this.results$ = this.query$.pipe(
      debounceTime(200),
      filter((query) => !!query),
      mergeMap((query) => this.championGuessService.queryChampions(query)),
      map(({ data, endpoint }) => {
        this.championGuessStore.removeLoadingEndpoint(endpoint);
        return data.filter(
          (result) => !this.guesses.map((g) => g.id).includes(result.id)
        );
      })
    );

    this.championGuessStore
      .getGuesses$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((guesses) => (this.guesses = guesses));

    this.championGuessStore.fetchLastChampion();
  }

  handleQueryChange(query: string) {
    this.query$.next(query);
  }

  guess() {
    if (this.selectedChampion) {
      this.championGuessStore.checkGuess(this.selectedChampion);
      this.selectedChampion = undefined;
    }
  }

  matchStateClass(results: IChampionGuessResult[], attr: string) {
    const match = results.find((r) => r.attribute === attr)?.match;

    return match === "exact"
      ? "green-border"
      : match === "wrong"
      ? "red-border"
      : "yellow-border";
  }

  matchStateByAttrresults(results: IChampionGuessResult[], attr: string) {
    return results.find((r) => r.attribute === attr);
  }

  checkFinished(results: IChampionGuessResult[]) {
    const mapped = results.map((r) => r.match);
    const finished = mapped.every((v) => v === "exact");
    this.championGuessStore.setFinished(finished);
  }

  copyShareLink() {
    navigator.share({
      url: " https://www.tftordle.com/",
      text: `I found the Tftordle champion guess champion in ${this.guesses.length} tries!`,
    });
  }
}
