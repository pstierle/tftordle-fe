import { map } from "rxjs";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface IBaseResponse<T> {
  data: T;
  endpoint: string;
}

@Injectable({
  providedIn: "root",
})
export class BaseApiService {
  constructor(private http: HttpClient) {}

  protected get<T>(
    endpoint: string,
    options?: { params: any }
  ): Observable<IBaseResponse<T>> {
    return this.http.get<T>(endpoint, options).pipe(
      map((data: T) => ({
        data,
        endpoint,
      }))
    );
  }
}
