import { ILastChampion } from "src/app/_models/models";
import { Observable } from "rxjs";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-last-champion",
  templateUrl: "./last-champion.component.html",
  styleUrls: [],
})
export class LastChampionComponent {
  @Input() lastChampion$!: Observable<ILastChampion>;
}
