import { HttpClient } from "@angular/common/http";
import { ChampionGuessService } from "./../../_services/champion-guess.service";
import { Component, OnInit } from "@angular/core";
import { debounceTime, filter, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { trigger } from "@angular/animations";
import { inOut } from "src/app/_animations/animations";
import { IChampionGuessChampion, ILastChampion } from "src/app/_models/models";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-champion-guess",
  templateUrl: "./champion-guess.page.html",
  styleUrls: ["./champion-guess.page.scss"],
  animations: [trigger("inOutAnimation", inOut)],
})
export class ChampionGuessPage implements OnInit {
  constructor(
    private championGuessService: ChampionGuessService,
    private http: HttpClient,
    private clipboard: Clipboard
  ) {}

  query$ = new Subject<string>();
  query: string = "";
  selectedChampion?: IChampionGuessChampion = undefined;
  showResults = false;
  displayedColumns: string[] = ["champion", "set", "cost", "range", "traits"];

  ngOnInit(): void {
    // this.query$
    //   .pipe(
    //     debounceTime(200),
    //     filter((query) => !!query)
    //   )
    //   .subscribe((query) => this.championGuessService.queryChampions(query));
    // this.lastChampion$ = this.championGuessService.getLastChampion();
  }

  // handleChange(query: string) {
  //   this.query$.next(query);
  //   this.selectedChampion = undefined;
  // }

  // selectGuess(result: IChampionGuessChampion) {
  //   this.query = result.name + " - Set: " + result.set;
  //   this.selectedChampion = result;
  //   this.showResults = false;
  // }

  // handleClickOutSide() {
  //   this.showResults = false;
  // }

  // handleFocus() {
  //   this.showResults = true;
  // }

  // guess() {
  //   if (this.selectedChampion) {
  //     this.showResults = false;
  //     this.http
  //       .get<IChampionGuessResult[]>(
  //         environment.apiUrl +
  //           "/champion-guess/check-guess-attr/" +
  //           this.selectedChampion.id
  //       )
  //       .subscribe((results) => {
  //         if (this.selectedChampion) {
  //           this.guesses$.next([
  //             {
  //               ...this.selectedChampion,
  //               traits: results.find((r) => r.attrLabel === "traits")
  //                 ?.userGuessValue,
  //               results: results,
  //             },
  //             ...this.guesses$.getValue(),
  //           ]);
  //         }
  //         this.results$.next(
  //           this.results$.getValue().filter(
  //             (result) =>
  //               !this.guesses$
  //                 .getValue()
  //                 .map((r) => r.id)
  //                 .includes(result.id)
  //           )
  //         );
  //         this.guessCount$.next(this.guessCount$.getValue() + 1);
  //         this.selectedChampion = undefined;
  //         this.query = "";
  //       });
  //   }
  // }

  // get dataSource() {
  //   return this.guesses$.getValue();
  // }

  // get wrongGuessCount() {
  //   return this.wrongGuessCount$.getValue();
  // }

  // matchStateClass(results: IChampionGuessResult[], attr: string) {
  //   const matchState = results.find((r) => r.attrLabel === attr)?.matchState;

  //   return matchState === "exact"
  //     ? "green-border"
  //     : matchState === "wrong"
  //     ? "red-border"
  //     : "yellow-border";
  // }

  // matchStateByAttrresults(results: IChampionGuessResult[], attr: string) {
  //   return results.find((r) => r.attrLabel === attr);
  // }

  // checkFinished(results: IChampionGuessResult[]) {
  //   const mapped = results.map((r) => r.matchState);
  //   const finished = mapped.every((v) => v === "exact");
  //   this.finished$.next(finished);
  //   if (!finished) {
  //     this.wrongGuessCount$.next(this.wrongGuessCount$.getValue() + 1);
  //     if (this.wrongGuessCount$.getValue() >= 3) {
  //       this.championGuessService.getTraitClue();
  //     }
  //   }
  // }

  // copyShareLink() {
  //   this.clipboard.copy(
  //     `I found the Tftordle champion guess champion in ${this.guessCount$.getValue()} tries! https://www.tftordle.com/`
  //   );
  // }
}
