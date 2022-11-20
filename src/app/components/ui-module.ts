import { ClueComponent } from "./clue/clue.component";
import { LetModule } from "@rx-angular/template";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ClickOutsideDirective } from "../_directives/click-outside.directive";
import { IconModule } from "./icons/icon.module";
import { HomeButtonComponent } from "./input/home-button/home-button-component";
import { ResultFormComponent } from "./input/result-form/result-form.component";
import { LastChampionComponent } from "./last-champion/last-champion.component";

@NgModule({
  imports: [CommonModule, FormsModule, IconModule, RouterModule, LetModule],
  declarations: [
    HomeButtonComponent,
    ClickOutsideDirective,
    ResultFormComponent,
    LastChampionComponent,
    ClueComponent,
  ],
  exports: [
    HomeButtonComponent,
    ClickOutsideDirective,
    ResultFormComponent,
    LastChampionComponent,
    ClueComponent,
  ],
  providers: [],
})
export class UiModule {}
