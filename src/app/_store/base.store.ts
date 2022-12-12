import { BaseComponent } from "./../components/base.component";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { ILastChampion } from "../_models/models";

@Injectable({
  providedIn: "root",
})
export class BaseStore extends BaseComponent {
  protected loadingEndpoints$ = new BehaviorSubject<string[] | undefined>(
    undefined
  );

  protected lastChampion$ = new BehaviorSubject<ILastChampion | undefined>(
    undefined
  );

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
  getEndpointLoading$(endpoint: string) {
    return this.loadingEndpoints$.pipe(
      map((endpoints) => endpoints?.includes(endpoint))
    );
  }
}
