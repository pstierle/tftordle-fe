import { IBaseResponse } from "./../_services/base-api.service";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, takeUntil, Observable, Subject, of } from "rxjs";
import { ILastChampion } from "../_models/models";

@Injectable({
  providedIn: "root",
})
export class BaseStore implements OnDestroy {
  protected loadingEndpoints$ = new BehaviorSubject<string[] | undefined>(
    undefined
  );

  protected lastChampion$ = new BehaviorSubject<ILastChampion | undefined>(
    undefined
  );

  protected destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  constructor() {}

  addLoadingEndpoint(endpoint: string) {
    const currentEndpoints = this.loadingEndpoints$.getValue() ?? [];
    this.loadingEndpoints$.next([...currentEndpoints, endpoint]);
  }
  removeLoadingEndpoint(endpoint: string) {
    const currentEndpoints = this.loadingEndpoints$.getValue() ?? [];
    this.loadingEndpoints$.next(currentEndpoints.filter((e) => e !== endpoint));
  }
  getLastChampion$() {
    return this.lastChampion$.asObservable();
  }
  isEndpointLoading$(endpoint: string) {
    return of(false);
  }
  resolveEndpoint<T>(response$: Observable<IBaseResponse<T>>) {
    return response$.pipe(
      map((value) => {
        // const currentEndpoints = this.loadingEndpoints$.getValue() ?? [];
        // this.loadingEndpoints$.next(
        //   currentEndpoints.filter((e) => e !== value.endpoint)
        // );
        return value.data;
      })
    );
  }
}
