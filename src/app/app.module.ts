import { ModalService } from "./_services/modal.service";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OverlayModule } from "@angular/cdk/overlay";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./views/navbar/navbar.component";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { LetModule } from "@rx-angular/template";
import { BackendInterceptor } from "./_interceptor/backend.interceptor";

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OverlayModule,
    AppRoutingModule,
    LetModule,
  ],
  providers: [
    ModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
