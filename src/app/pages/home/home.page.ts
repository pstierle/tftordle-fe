import { Component, OnInit } from "@angular/core";
import { AppRoutes } from "src/app/_constants/routes.contant";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: [],
})
export class HomePage implements OnInit {
  constructor() {}
  gameModes = [
    {
      id: 0,
      description: "Guess todays Trait's",
      link: "/" + AppRoutes.TRAIT,
    },
    {
      id: 1,
      description: "Guess todays Champion",
      link: "/" + AppRoutes.CHAMPION,
    },
  ];
  ngOnInit(): void {}
}
