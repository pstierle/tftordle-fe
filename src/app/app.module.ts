import { GuessComponent } from './views/champion-guess/guess/guess.component';
import { ModalService } from './_services/modal.service';
import { NavbarComponent } from './views/navabr/navbar.component';
import { ChampionGuessComponent } from './views/champion-guess/champion-guess.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconModule } from './components/icons/icon.module';
import { TraitGuessComponent } from './views/trait-guess/trait-guess.component';
import { ClickOutsideDirective } from './_directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    TraitGuessComponent,
    ChampionGuessComponent,
    ClickOutsideDirective,
    NavbarComponent,
    GuessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    IconModule,
    OverlayModule,
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
