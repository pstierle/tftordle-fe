import { BehaviorSubject, Observable, of, map } from "rxjs";
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
    return this.loadingEndpoints$.pipe(
      map((endpoints) => endpoints?.includes(endpoint))
    );
  }
}
