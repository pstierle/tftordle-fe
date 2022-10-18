import { HttpClient } from "@angular/common/http";
import {
  ChampionGuessService,
  IChampionGuessChampion,
  Match,
} from "../../../_services/champion-guess.service";
import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

interface Attribute {
  key: string;
  label: string;
  display: boolean;
  matching?: Match;
  value: any;
}

@Component({
  selector: "app-guess",
  templateUrl: "./guess.component.html",
  styleUrls: ["./guess.component.scss"],
})
export class GuessComponent implements OnInit {
  constructor(
    private championGuessService: ChampionGuessService,
    private http: HttpClient
  ) {}

  @Input() champion!: IChampionGuessChampion;

  attributs: Attribute[] = [
    {
      label: "Set",
      key: "set",
      display: false,
      matching: undefined,
      value: undefined,
    },
    {
      label: "Cost",
      key: "cost",
      display: false,
      matching: undefined,
      value: undefined,
    },
    {
      label: "Traits",
      key: "traits",
      display: false,
      matching: undefined,
      value: undefined,
    },
  ];

  ngOnInit(): void {
    this.http
      .get<
        {
          attrLabel: string;
          matchState: Match;
          userGuessValue: any;
        }[]
      >(
        environment.apiUrl +
          "/champion-guess/check-guess-attr/" +
          this.champion.id
      )
      .subscribe((results) => {
        this.attributs.forEach((attribute, i) => {
          setTimeout(() => {
            const result = results.find((r) => r.attrLabel === attribute.key);
            if (result) {
              this.attributs[i].display = true;
              this.attributs[i].matching = result.matchState;
              this.attributs[i].value = result.userGuessValue;

              if (i === this.attributs.length - 1) {
                if (
                  !this.attributs
                    .map((a) => a.matching)
                    .some((a) => a !== "exact")
                ) {
                  this.championGuessService.finished$.next(true);
                }
              }
            }
          }, (i + 1) * 800);
        });
      });
  }

  get displayAttributes() {
    return this.attributs.filter((a) => a.display);
  }
}
