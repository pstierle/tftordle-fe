import { environment } from "./../../../environments/environment";
import { ResetModalComponent } from "./../../components/modals/reset-modal/reset-modal.component";
import { ModalService } from "./../../_services/modal.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  constructor(
    private modalService: ModalService
  ) {}

  timeRemaining: number = 0;

  ngOnInit() {
    const events = new EventSource(environment.apiUrl + "/reset-timer-event");

    events.addEventListener("message", (timer) => {
      this.timeRemaining = Number(timer.data);
      if(this.timeRemaining <= 0){
        this.openResetModal();
      }
    });
  }

  openResetModal() {
    this.modalService.open<ResetModalComponent>(ResetModalComponent);
  }

  get parsedDate() {
    return new Date(this.timeRemaining * 1000).toISOString().slice(11, 19);
  }
}
