import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ClickOutsideDirective } from "../_directives/click-outside.directive";
import { IconModule } from "./icons/icon.module";
import { HomeButtonComponent } from "./input/home-button/home-button-component";

@NgModule({
  imports: [CommonModule, FormsModule, IconModule, RouterModule],
  declarations: [HomeButtonComponent, ClickOutsideDirective],
  exports: [HomeButtonComponent, ClickOutsideDirective],
  providers: [],
})
export class UiModule {}
