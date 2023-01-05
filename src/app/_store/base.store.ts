import { IBaseResponse } from "./../_services/base-api.service";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { ILastChampion } from "../_models/models";

export class BaseStore {
  public loadingEndpoints$ = new BehaviorSubject<string[] | undefined>([]);

  public lastChampion$ = new BehaviorSubject<ILastChampion | undefined>(
    undefined
  );

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
        //this.removeLoadingEndpoint(value.endpoint);
        return value.data;
      })
    );
  }
}
