import { HttpClient } from '@angular/common/http';
import {
  ChampionGuessService, IChampionGuessChampion, Match,
} from './../../../_services/champion-guess.service';
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
  selector: 'app-wrong-champion',
  templateUrl: './wrong-champion.component.html',
  styleUrls: ['./wrong-champion.component.scss'],
})
export class WrongChampionComponent implements OnInit {
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
        })
      }, (i + 1) * 1000);
    });
  }

  get displayAttributes(){
    return this.attributs.filter(a => a.display)
  }
}
