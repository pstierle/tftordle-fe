import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  IGuessResponse,
  ILastChampion,
  IStatClue,
  ITrait,
  ITraitGuessChampion,
} from "../_models/models";

@Injectable({
  providedIn: "root",
})
export class TraitGuessService {
  constructor(private http: HttpClient) {}

  url = environment.apiUrl + "/trait-guess";

  getTraitGuessChampion() {
    return this.http.get<ITraitGuessChampion>(this.url + "/champion");
  }

  queryTraits(query: string) {
    return this.http.get<ITrait[]>(this.url + "/query-traits/" + query);
  }

  getSameTraitClue() {
    return this.http.get<string[]>(this.url + "/same-trait-clue");
  }

  getStatClue() {
    return this.http.get<IStatClue>(this.url + "/stat-clue");
  }

  checkGuess(trait: ITrait) {
    return this.http.get<IGuessResponse>(
      this.url + "/check-guess/" + trait.label
    );
  }

  getLastChampion() {
    return this.http.get<ILastChampion>(this.url + "/last");
  }
}
