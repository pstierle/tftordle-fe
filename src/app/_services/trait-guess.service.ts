import { BaseApiService } from "./base-api.service";
import { traitGuessRoutes } from "./../_constants/endpoints.contants";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  ITraitGuessResult,
  ILastChampion,
  IStatClue,
  ITrait,
  ITraitGuessChampion,
} from "../_models/models";

@Injectable({
  providedIn: "root",
})
export class TraitGuessService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getTraitGuessChampion() {
    return this.get<ITraitGuessChampion>(traitGuessRoutes.champion);
  }

  queryTraits(query: string) {
    return this.get<ITrait[]>(traitGuessRoutes.queryTraits, {
      params: {
        query,
      },
    });
  }

  getSameTraitClue() {
    return this.get<string[]>(traitGuessRoutes.sameTraitClue);
  }

  getStatClue() {
    return this.get<IStatClue>(traitGuessRoutes.statClue);
  }

  checkGuess(trait: ITrait) {
    return this.get<ITraitGuessResult>(traitGuessRoutes.checkGuess, {
      params: {
        label: trait.label,
      },
    });
  }

  getLastChampion() {
    return this.get<ILastChampion>(traitGuessRoutes.lastChampion);
  }
}
