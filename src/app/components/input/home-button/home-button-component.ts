import { AppRoutes } from "./../../../_constants/routes.contant";
import { Component } from "@angular/core";

@Component({
  selector: "app-home-button",
  template: `
    <a
      class="px-6 py-2 font-bold secondary-input text-center hover:scale-105 transition-all"
      [routerLink]="homeRoute"
    >
      Home
    </a>
  `,
  styleUrls: [],
})
export class HomeButtonComponent {
  homeRoute = AppRoutes.HOME;
}
