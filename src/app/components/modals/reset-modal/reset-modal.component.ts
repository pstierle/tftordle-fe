import { Component } from '@angular/core';

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
