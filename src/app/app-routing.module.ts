import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [],
  },
  {
    path: "trait",
    loadChildren: () =>
      import("./pages/trait-guess/trait-guess.module").then(
        (m) => m.TraitGuessModule
      ),
    canActivate: [],
  },
  {
    path: "champion",
    loadChildren: () =>
      import("./pages/champion-guess/champion-guess.module").then(
        (m) => m.ChampionGuessModule
      ),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
