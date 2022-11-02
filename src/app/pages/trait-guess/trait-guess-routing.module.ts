import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TraitGuessPage } from "./trait-guess.page";

const routes: Routes = [
  {
    path: "",
    component: TraitGuessPage,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraitGuessRoutingModule {}
