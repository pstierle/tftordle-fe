import { Component } from "@angular/core";

@Component({
  selector: "app-home-button",
  template: `
    <a
      class="px-6 py-2 font-bold primary-input text-center hover:scale-105 transition-all"
      [routerLink]="'/'"
    >
      Back
    </a>
  `,
  styleUrls: [],
})
export class HomeButtonComponent {}
