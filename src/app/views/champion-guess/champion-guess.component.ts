import { HttpClient } from "@angular/common/http";
import {
  ChampionGuessService,
  IChampionGuessChampion,
  IChampionGuessResult,
} from "./../../_services/champion-guess.service";
import { Component, OnInit } from "@angular/core";
import { debounceTime, filter, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { trigger } from "@angular/animations";
import { inOut } from "src/app/_animations/animations";
import { ILastChampion } from "src/app/_models/models";
import { Clipboard } from "@angular/cdk/clipboard";

type match = "exact" | "higher" | "lower";

@Component({
  selector: "app-champion-guess",
  templateUrl: "./champion-guess.component.html",
  styleUrls: ["./champion-guess.component.scss"],
  animations: [trigger("inOutAnimation", inOut)],
})
export class ChampionGuessComponent implements OnInit {
  constructor(
    private championGuessService: ChampionGuessService,
    private http: HttpClient,
    private clipboard: Clipboard
  ) {}

  query$ = new Subject<string>();
  query: string = "";
  selectedChampion?: IChampionGuessChampion = undefined;
  results$ = this.championGuessService.championQueryResults$;
  guesses$ = this.championGuessService.guesses$;
  finished$ = this.championGuessService.finished$;
  guessCount$ = this.championGuessService.guessCount$;
  errorMessage$ = this.championGuessService.errorMessage$;
  lastChampion$!: Observable<ILastChampion>;
  showResults = false;
  displayedColumns: string[] = ["champion", "set", "cost", "range", "traits"];

  ngOnInit(): void {
    this.query$
      .pipe(
        debounceTime(200),
        filter((query) => !!query)
      )
      .subscribe((query) => this.championGuessService.queryChampions(query));

    this.lastChampion$ = this.championGuessService.getLastChampion();
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
    const finished = mapped.every((v) => v === "exact");
    this.finished$.next(finished);
  }

  copyShareLink() {
    this.clipboard.copy(
      `I found the Tftordle champion guess champion in ${this.guessCount$.getValue()} tries. https://www.tftordle.com/`
    );
  }
}
