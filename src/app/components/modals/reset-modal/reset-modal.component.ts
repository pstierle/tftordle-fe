import { Component } from '@angular/core';
import { ResetGuessService } from 'src/app/_services/reset-guess.service';

@Component({
  selector: 'app-reset-modal',
  templateUrl: './reset-modal.component.html',
  styleUrls: [],
})
export class ResetModalComponent {
  constructor() {}

  reload() {
    window.location.reload();
  }
}
