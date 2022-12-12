import { ChampionGuessStore } from "src/app/_store/champion-guess.store";
import { TraitGuessStore } from "src/app/_store/trait-guess.store";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import {
  championGuessPrefix,
  traitGuessPrefix,
} from "../_constants/endpoints.contants";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(
    private championGuessStore: ChampionGuessStore,
    private traitGuessStore: TraitGuessStore
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders().set("content-type", "application/json");

    let params = "";

    if (req.url.includes(championGuessPrefix)) {
      this.championGuessStore.addLoadingEndpoint(req.url);
    }
    if (req.url.includes(traitGuessPrefix)) {
      this.traitGuessStore.addLoadingEndpoint(req.url);
    }

    req.params.keys().forEach((key) => {
      params += "/";
      params += req.params.get(key);
    });

    const parsedRequest = req.clone({
      url: environment.apiUrl + req.url + params,
      headers,
      params: undefined,
    });

    return next.handle(parsedRequest);
  }
}
