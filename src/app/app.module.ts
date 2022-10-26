import { ShowAfterDirective } from "./_directives/show-after.directive";
import { ModalService } from "./_services/modal.service";
import { NavbarComponent } from "./views/navabr/navbar.component";
import { ChampionGuessComponent } from "./views/champion-guess/champion-guess.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { OverlayModule } from "@angular/cdk/overlay";

import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconModule } from "./components/icons/icon.module";
import { TraitGuessComponent } from "./views/trait-guess/trait-guess.component";
import { ClickOutsideDirective } from "./_directives/click-outside.directive";
import { CdkTableModule } from "@angular/cdk/table";
import { MatchIconComponent } from "./views/champion-guess/match-icon/match-icon.component";

@NgModule({
  declarations: [
    AppComponent,
    TraitGuessComponent,
    ChampionGuessComponent,
    ClickOutsideDirective,
    ShowAfterDirective,
    NavbarComponent,
    MatchIconComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    IconModule,
    OverlayModule,
    CdkTableModule,
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
