import { traitGuessRoutes } from "./../../_constants/endpoints.contants";
import { BaseComponent } from "./../../components/base.component";
import { TraitGuessStore } from "./../../_store/trait-guess.store";
import { trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import {
  Observable,
  Subject,
  debounceTime,
  filter,
  of,
  mergeMap,
  map,
  takeUntil,
} from "rxjs";
import { inOut } from "src/app/_animations/animations";
import { TraitGuessService } from "src/app/_services/trait-guess.service";
import { ITrait } from "src/app/_models/models";

@Component({
  selector: "app-trait-guess",
  templateUrl: "./trait-guess.page.html",
  styleUrls: [],
  animations: [trigger("inOutAnimation", inOut)],
})
export class TraitGuessPage extends BaseComponent implements OnInit {
  constructor(
    private traitGuessService: TraitGuessService,
    private traitGuessStore: TraitGuessStore
  ) {
    super();
  }

  guessChampion$ = this.traitGuessStore.getGuessChampion$();
  lastChampion$ = this.traitGuessStore.getLastChampion$();
  finished$ = this.traitGuessStore.getFinished$();
  results$: Observable<ITrait[]> = of([]);
  correctGuesses$ = this.traitGuessStore.getCorrectGuesses$();
  wrongGuesses$ = this.traitGuessStore.getWrongGuesses$();
  lastChampionLoading$ = this.traitGuessStore.isEndpointLoading$(
    traitGuessRoutes.lastChampion
  );
  championLoading$ = this.traitGuessStore.isEndpointLoading$(
    traitGuessRoutes.champion
  );
  resultsLoading$ = this.traitGuessStore.isEndpointLoading$(
    traitGuessRoutes.queryTraits
  );
  guessLoading$ = this.traitGuessStore.isEndpointLoading$(
    traitGuessRoutes.checkGuess
  );

  selectedTrait?: ITrait;
  guesses: ITrait[] = [];
  traitGuessRoutes = traitGuessRoutes;
  query$ = new Subject<string>();

  ngOnInit(): void {
    this.results$ = this.query$.pipe(
      debounceTime(200),
      filter((query) => !!query),
      mergeMap((query) => this.traitGuessService.queryTraits(query)),
      map(({ data, endpoint }) => {
        this.traitGuessStore.removeLoadingEndpoint(endpoint);
        return data.filter(
          (trait) => !this.guesses.map((g) => g.label).includes(trait.label)
        );
      })
    );

    this.traitGuessStore
      .getGuesses$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (guesses) =>
          (this.guesses = guesses.map((g) => {
            return {
              label: g.trait.label,
              imagePath: g.trait.imagePath,
            };
          }))
      );

    this.traitGuessStore.fetchLastChampion();
    this.traitGuessStore.fetchGuessChampion();
  }

  handleQueryChange(query: string) {
    this.query$.next(query);
    this.selectedTrait = undefined;
  }

  guess() {
    if (this.selectedTrait) {
      this.traitGuessStore.checkGuess(this.selectedTrait);
      this.selectedTrait = undefined;
    }
  }

  copyShareLink() {
    navigator.share({
      url: "https://www.tftordle.com/",
      text: `I found the Tftordle guess trait's in ${this.guesses.length} tries!`,
    });
  }
}
