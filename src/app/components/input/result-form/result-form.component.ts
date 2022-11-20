import { Component, EventEmitter, Input, Output } from "@angular/core";
import { trigger } from "@angular/animations";
import { inOut } from "src/app/_animations/animations";

@Component({
  selector: "app-result-form",
  templateUrl: "./result-form.component.html",
  styleUrls: [],
  animations: [trigger("inOutAnimation", inOut)],
})
export class ResultFormComponent {
  @Input() results: any = [];
  @Input() placeholder!: string;

  @Input() query!: string;
  @Output() queryChange = new EventEmitter<string>();

  @Input() selectedResult!: any;
  @Output() selectedResultChange = new EventEmitter<any>();

  @Output() handleGuess = new EventEmitter<void>();

  handleChange(query: string) {
    this.query = query;
    this.selectedResult = undefined;
    this.queryChange.emit(this.query);
    this.selectedResultChange.emit(this.selectedResult);
  }

  selectResult(result: any) {
    this.selectedResult = result;
    if (result.label) {
      this.query = result.label;
    } else {
      this.query = `${result.name} - Set ${result.set}`;
    }
    this.results = [];
    this.selectedResultChange.emit(this.selectedResult);
  }

  handleClickOutSide() {
    this.results = [];
  }

  guess() {
    this.handleGuess.emit();
    this.selectedResult = undefined;
    this.query = "";
  }
}
