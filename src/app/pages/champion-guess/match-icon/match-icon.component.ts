import { Component, Input } from "@angular/core";
import { Match } from "src/app/_models/models";

@Component({
  selector: "app-match-icon",
  templateUrl: "./match-icon.component.html",
  styleUrls: [],
})
export class MatchIconComponent {
  @Input() matchState?: Match;

  constructor() {}
}
