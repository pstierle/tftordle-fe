import { traitGuessRoutes } from "./../_constants/endpoints.contants";
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

  getTraitGuessChampion() {
    return this.http.get<ITraitGuessChampion>(traitGuessRoutes.champion);
  }

  queryTraits(query: string) {
    return this.http.get<ITrait[]>(traitGuessRoutes.queryTraits, {
      params: {
        query,
      },
    });
  }

  getSameTraitClue() {
    return this.http.get<string[]>(traitGuessRoutes.sameTraitClue);
  }

  getStatClue() {
    return this.http.get<IStatClue>(traitGuessRoutes.statClue);
  }

  checkGuess(trait: ITrait) {
    return this.http.get<IGuessResponse>(traitGuessRoutes.checkGuess, {
      params: {
        label: trait.label,
      },
    });
  }

  getLastChampion() {
    return this.http.get<ILastChampion>(traitGuessRoutes.lastChampion);
  }
}
