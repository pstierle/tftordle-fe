import { championGuessRoutes } from "./../_constants/endpoints.contants";
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

  queryChampions(query: string) {
    return this.http.get<IChampionGuessChampion[]>(
      championGuessRoutes.queryChampions,
      { params: { query } }
    );
  }

  getLastChampion() {
    return this.http.get<ILastChampion>(championGuessRoutes.lastChampion);
  }

  getTraitClue() {
    return this.http.get<string[]>(championGuessRoutes.traitClue);
  }

  checkGuess(champion: IChampionGuessChampion) {
    return this.http.get<IChampionGuessResult[]>(
      championGuessRoutes.checkGuess,
      {
        params: { championId: champion.id },
      }
    );
  }
}
