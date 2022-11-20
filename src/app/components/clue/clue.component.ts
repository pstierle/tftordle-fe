import { Component, Input } from "@angular/core";

@Component({
  selector: "app-clue",
  templateUrl: "./clue.component.html",
  styleUrls: [],
})
export class ClueComponent {
  @Input() label!: string;
  @Input() displayClue!: boolean;
}
