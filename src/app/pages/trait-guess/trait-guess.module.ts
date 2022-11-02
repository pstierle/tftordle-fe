import { NgModule } from "@angular/core";
import { TraitGuessPage } from "./trait-guess.page";
import { TraitGuessRoutingModule } from "./trait-guess-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconModule } from "src/app/components/icons/icon.module";
import { UiModule } from "src/app/components/ui-module";

@NgModule({
  declarations: [TraitGuessPage],
  imports: [
    TraitGuessRoutingModule,
    CommonModule,
    FormsModule,
    IconModule,
    UiModule,
  ],
  providers: [],
})
export class TraitGuessModule {}
