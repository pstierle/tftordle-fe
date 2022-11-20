export interface ILastChampion {
  number: number;
  name: string;
  set: string;
}

export interface ITraitGuess {
  correct: boolean;
  trait: ITrait;
}

export interface ITraitGuessChampion {
  name: string;
  set: number;
  imagePath: string;
}
export interface IStatClue {
  cost: number;
  oneTraitStartsWith: string;
  traitCount: number;
}

export interface IGuessResponse {
  correct: boolean;
  needed?: number;
  guess: ITrait;
}

export interface ITrait {
  label: string;
  imagePath: string;
}

export type Match = "exact" | "higher" | "lower" | "wrong" | "some";

export interface IChampionGuessResult {
  attrLabel: string;
  matchState: Match;
  userGuessValue: any;
}

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
