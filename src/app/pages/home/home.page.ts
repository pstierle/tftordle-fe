import { Component, OnInit } from "@angular/core";

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
      link: "/trait",
    },
    {
      id: 1,
      description: "Guess todays Champion",
      link: "/champion",
    },
  ];
  ngOnInit(): void {}
}
