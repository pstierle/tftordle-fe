import { championGuessRoutes } from "./../_constants/endpoints.contants";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  IChampionGuessChampion,
  IChampionGuessResult,
  ILastChampion,
} from "../_models/models";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: "root",
})
export class ChampionGuessService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  queryChampions(query: string) {
    return this.get<IChampionGuessChampion[]>(
      championGuessRoutes.queryChampions,
      { params: { query } }
    );
  }

  getLastChampion() {
    return this.get<ILastChampion>(championGuessRoutes.lastChampion);
  }

  getTraitClue() {
    return this.get<string[]>(championGuessRoutes.traitClue);
  }

  checkGuess(champion: IChampionGuessChampion) {
    return this.get<IChampionGuessResult[]>(championGuessRoutes.checkGuess, {
      params: { championId: champion.id },
    });
  }
}
