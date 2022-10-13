import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TFTordle';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Tftordle');
  }

  gameModes = [
    {
      id: 0,
      description: "Guess todays Trait's",
    },
    {
      id: 1,
      description: "Guess todays Champion",
    }
  ];

  selectedGameModeId?: number = undefined;

  selectGameMode(id: number) {
    this.selectedGameModeId = id;
  }

  reset() {
    this.selectedGameModeId = undefined;
  }
}
