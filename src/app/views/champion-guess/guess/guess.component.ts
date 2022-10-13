import { HttpClient } from '@angular/common/http';
import {
  ChampionGuessService, IChampionGuessChampion, Match,
} from '../../../_services/champion-guess.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Attribute{
  key: string;
  label: string;
  display: boolean;
  matching?: Match;
  value: any
}

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
})
export class GuessComponent implements OnInit {
  constructor(private championGuessService: ChampionGuessService, private http: HttpClient) {}

  @Input() champion!: IChampionGuessChampion;

  attributs : Attribute[] = [
    {
      label: "Set",
      key: "set",
      display: false,
      matching: undefined,
      value: undefined
    },
    {
      label: "Cost",
      key: "cost",
      display: false,
      matching: undefined,
      value: undefined
    },
    {
      label: "Traits",
      key: "traits",
      display: false,
      matching: undefined,
      value: undefined
    }
  ]

  ngOnInit(): void {
    this.attributs.forEach((attribute, i) => {
      setTimeout(() => {
        this.http.get<Match>(environment.apiUrl + '/check-champion-guess-attr/' + this.champion.id + "/" + attribute.key).subscribe((matching) => {
          this.attributs[i].display = true;
          this.attributs[i].matching = matching;
          this.attributs[i].value = (this.champion as any)[this.attributs[i].key];

          if(i === this.attributs.length - 1){
          if(!this.attributs.map(a => a.matching).some(a => a !== "exact")){
              this.championGuessService.finished$.next(true);
            }
          }
        })
      }, (i + 1) * 1000);
    });
  }

  get displayAttributes(){
    return this.attributs.filter(a => a.display)
  }
}
