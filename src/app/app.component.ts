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
      label: 'Trait',
      description: "Guess the Trait's of a Champion",
    },
    {
      label: 'Champion',
      description: 'Guess a Champion',
    },
    {
      label: 'Trait Icon',
      description: "Guess a Trait's Name by Icon",
    },
  ];
  selectedGameMode?: string;

  selectGameMode(mode: string) {
    this.selectedGameMode = mode;
  }

  reset() {
    this.selectedGameMode = undefined;
  }
}
