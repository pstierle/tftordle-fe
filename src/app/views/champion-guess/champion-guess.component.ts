import { HttpClient } from "@angular/common/http";
import {
  ChampionGuessService,
  IChampionGuessChampion,
  IChampionGuessResult,
  Match,
} from "./../../_services/champion-guess.service";
import { Component, OnInit } from "@angular/core";
import { debounceTime, filter, Subject } from "rxjs";
import { environment } from "src/environments/environment";

type match = "exact" | "higher" | "lower";

@Component({
  selector: "app-champion-guess",
  templateUrl: "./champion-guess.component.html",
  styleUrls: ["./champion-guess.component.scss"],
})
export class ChampionGuessComponent implements OnInit {
  constructor(
    private championGuessService: ChampionGuessService,
    private http: HttpClient
  ) {}

  query$ = new Subject<string>();
  query: string = "";
  selectedChampion?: IChampionGuessChampion = undefined;
  results$ = this.championGuessService.championQueryResults$;
  guesses$ = this.championGuessService.guesses$;
  finished$ = this.championGuessService.finished$;
  guessCount$ = this.championGuessService.guessCount$;
  errorMessage$ = this.championGuessService.errorMessage$;
  showResults = false;
  displayedColumns: string[] = ["champion", "set", "cost", "range", "traits"];

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

  handleFocus() {
    this.showResults = true;
  }

  guess() {
    if (this.selectedChampion) {
      this.showResults = false;
      this.http
        .get<IChampionGuessResult[]>(
          environment.apiUrl +
            "/champion-guess/check-guess-attr/" +
            this.selectedChampion.id
        )
        .subscribe((results) => {
          if (this.selectedChampion) {
            this.guesses$.next([
              ...this.guesses$.getValue(),
              {
                ...this.selectedChampion,
                traits: results.find((r) => r.attrLabel === "traits")
                  ?.userGuessValue,
                results: results,
              },
            ]);
          }
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
        });
    }
  }

  get dataSource() {
    return this.guesses$.getValue();
  }

  matchStateClass(results: IChampionGuessResult[], attr: string) {
    const matchState = results.find((r) => r.attrLabel === attr)?.matchState;

    return matchState === "exact"
      ? "green-border"
      : matchState === "wrong"
      ? "red-border"
      : "yellow-border";
  }

  matchStateByAttrresults(results: IChampionGuessResult[], attr: string) {
    return results.find((r) => r.attrLabel === attr);
  }

  checkFinished(results: IChampionGuessResult[]) {
    const mapped = results.map((r) => r.matchState);
    const finished = mapped.every((v) => v === mapped[0]);
    this.finished$.next(finished);
  }
}
