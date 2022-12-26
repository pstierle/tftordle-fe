export const championGuessPrefix = "/champion-guess";

export const championGuessRoutes = {
  queryChampions: championGuessPrefix + "/query-champions",
  lastChampion: championGuessPrefix + "/last",
  traitClue: championGuessPrefix + "/trait-clue",
  checkGuess: championGuessPrefix + "/check-guess",
};

export const traitGuessPrefix = "/trait-guess";

export const traitGuessRoutes = {
  lastChampion: traitGuessPrefix + "/last",
  checkGuess: traitGuessPrefix + "/check-guess",
  statClue: traitGuessPrefix + "/stat-clue",
  sameTraitClue: traitGuessPrefix + "/same-trait-clue",
  queryTraits: traitGuessPrefix + "/query-traits",
  champion: traitGuessPrefix + "/champion",
};
