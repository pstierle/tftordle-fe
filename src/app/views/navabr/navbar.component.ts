import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ResetModalComponent } from "./../../components/modals/reset-modal/reset-modal.component";
import { ModalService } from "./../../_services/modal.service";
import { Component, OnInit } from "@angular/core";
import { ResetGuessService } from "src/app/_services/reset-guess.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  constructor(
    private resetGuessService: ResetGuessService,
    private modalService: ModalService,
    private http: HttpClient
  ) {}

  timeRemaining: number = 0;
  timerIntervall: any = undefined;

  ngOnInit() {
    const events = new EventSource(environment.apiUrl + "/reset-timer-event");

    events.addEventListener("message", (event) => {
      console.log("yeet");
      console.log(event);
    });

    // this.resetGuessService.getResetTimer().subscribe((timer) => {
    //   // add 2 second buffer just in case
    //   this.timeRemaining = timer - 2;

    //   this.timerIntervall = setInterval(() => {
    //     this.timeRemaining -= 1;
    //     if (this.timeRemaining <= 0) {
    //       this.openResetModal();
    //       clearInterval(this.timerIntervall);
    //     }
    //   }, 1000);
    // });
  }

  test() {
    this.http.get(environment.apiUrl + "/test").subscribe();
  }

  openResetModal() {
    this.modalService.open<ResetModalComponent>(ResetModalComponent);
  }

  get parsedDate() {
    return new Date(this.timeRemaining * 1000).toISOString().slice(11, 19);
  }
}
