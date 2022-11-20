import { LetModule } from "@rx-angular/template";
import { UiModule } from "src/app/components/ui-module";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChampionGuessPage } from "./champion-guess.page";
import { ChampionGuessRoutingModule } from "./champion-guess-routing.module";
import { ShowAfterDirective } from "src/app/_directives/show-after.directive";
import { CdkTableModule } from "@angular/cdk/table";
import { IconModule } from "src/app/components/icons/icon.module";
import { MatchIconComponent } from "./match-icon/match-icon.component";
import { GuessCluesComponent } from "./guess-clues/guess-clues.component";

@NgModule({
  declarations: [
    ChampionGuessPage,
    ShowAfterDirective,
    MatchIconComponent,
    GuessCluesComponent,
  ],
  imports: [
    ChampionGuessRoutingModule,
    CommonModule,
    CdkTableModule,
    IconModule,
    FormsModule,
    UiModule,
    LetModule,
  ],
  providers: [],
})
export class ChampionGuessModule {}
