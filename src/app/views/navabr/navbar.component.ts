import { HttpClient } from "@angular/common/http";
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
  constructor(private modalService: ModalService, private http: HttpClient) {}

  timeRemaining: number = 0;

  ngOnInit() {
    this.http.get(environment.apiUrl + "/reset-timer").subscribe((timer) => {
      this.timeRemaining = Number(timer);
      setInterval(() => {
        this.timeRemaining -= 1;

        if (this.timeRemaining <= 0) {
          this.openResetModal();
        }
      }, 1000);
    });
  }

  openResetModal() {
    this.modalService.open<ResetModalComponent>(ResetModalComponent);
  }

  get parsedDate() {
    return new Date(this.timeRemaining * 1000).toISOString().slice(11, 19);
  }
}
