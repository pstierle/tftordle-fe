import { ITrait } from "./trait-guess.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { ILastChampion } from "../_models/models";

export interface IChampionGuessChampion {
  id: string;
  name: string;
  set: number;
  traitCount?: number;
  imagePath?: string;
  cost: number;
  range: number;
  traits?: ITrait[];
  results?: IChampionGuessResult[];
}

export interface IChampionGuessResponse {
  correct: boolean;
  invalidChampion?: boolean;
}

export type Match = "exact" | "higher" | "lower" | "wrong" | "some";

export interface IChampionGuessResult {
  attrLabel: string;
  matchState: Match;
  userGuessValue: any;
}

@Injectable({
  providedIn: "root",
})
export class ChampionGuessService {
  guesses$ = new BehaviorSubject<IChampionGuessChampion[]>([]);
  championQueryResults$ = new BehaviorSubject<IChampionGuessChampion[]>([]);
  finished$ = new BehaviorSubject<boolean>(false);
  errorMessage$ = new BehaviorSubject<string | undefined>(undefined);
  guessCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  url = environment.apiUrl + "/champion-guess";

  queryChampions(query: string) {
    this.http
      .get<IChampionGuessChampion[]>(this.url + "/query-champions/" + query)
      .subscribe((results) => {
        this.championQueryResults$.next(
          results.filter(
            (result) =>
              !this.guesses$
                .getValue()
                .map((r) => r.id)
                .includes(result.id)
          )
        );
      });
  }

  getLastChampion() {
    return this.http.get<ILastChampion>(this.url + "/last");
  }
}
