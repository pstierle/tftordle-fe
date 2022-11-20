import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  IChampionGuessChampion,
  IChampionGuessResult,
  ILastChampion,
} from "../_models/models";

@Injectable({
  providedIn: "root",
})
export class ChampionGuessService {
  constructor(private http: HttpClient) {}

  url = environment.apiUrl + "/champion-guess";

  queryChampions(query: string) {
    return this.http.get<IChampionGuessChampion[]>(
      this.url + "/query-champions/" + query
    );
  }

  getLastChampion() {
    return this.http.get<ILastChampion>(this.url + "/last");
  }

  getTraitClue() {
    return this.http.get<string[]>(this.url + "/trait-clue");
  }

  checkGuess(champion: IChampionGuessChampion) {
    return this.http.get<IChampionGuessResult[]>(
      environment.apiUrl + "/champion-guess/check-guess-attr/" + champion.id
    );
  }
}
