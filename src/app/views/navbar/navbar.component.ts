import { AppRoutes } from "./../../_constants/routes.contant";
import { HttpClient } from "@angular/common/http";
import { ResetModalComponent } from "../../components/modals/reset-modal/reset-modal.component";
import { ModalService } from "../../_services/modal.service";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private http: HttpClient,
    private router: Router
  ) {}

  timeRemaining: number = 0;

  displayHomeButton: boolean = true;

  ngOnInit() {
    this.http.get("/reset-timer").subscribe((timer) => {
      this.timeRemaining = Number(timer);
      setInterval(() => {
        this.timeRemaining -= 1;

        if (this.timeRemaining <= 0) {
          this.openResetModal();
        }
      }, 1000);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.displayHomeButton = !event.url.includes(AppRoutes.HOME);
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
