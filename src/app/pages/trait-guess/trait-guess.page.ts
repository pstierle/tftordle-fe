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
    private store: TraitGuessStore
  ) {
    super();
  }

  guessChampion$ = this.store.getGuessChampion$();
  lastChampion$ = this.store.getLastChampion$();
  finished$ = this.store.getFinished$();
  results$: Observable<ITrait[]> = of([]);
  correctGuesses$ = this.store.getCorrectGuesses$();
  wrongGuesses$ = this.store.getWrongGuesses$();
  lastChampionLoading$ = this.store.getEndpointLoading$(
    traitGuessRoutes.lastChampion
  );
  championLoading$ = this.store.getEndpointLoading$(traitGuessRoutes.champion);
  resultsLoading$ = this.store.getEndpointLoading$(
    traitGuessRoutes.queryTraits
  );
  guessLoading$ = this.store.getEndpointLoading$(traitGuessRoutes.checkGuess);
  selectedTrait?: ITrait;
  guesses: ITrait[] = [];
  traitGuessRoutes = traitGuessRoutes;
  query$ = new Subject<string>();

  ngOnInit(): void {
    this.results$ = this.query$.pipe(
      debounceTime(200),
      filter((query) => !!query),
      mergeMap((query) => this.traitGuessService.queryTraits(query)),
      map((traits) => {
        this.store.removeLoadingEndpoint(traitGuessRoutes.queryTraits);
        return traits.filter(
          (trait) => !this.guesses.map((g) => g.label).includes(trait.label)
        );
      })
    );

    this.store
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

    this.store.fetchLastChampion();
    this.store.fetchGuessChampion();
  }

  handleQueryChange(query: string) {
    this.query$.next(query);
    this.selectedTrait = undefined;
  }

  guess() {
    if (this.selectedTrait) {
      this.store.checkGuess(this.selectedTrait);
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
