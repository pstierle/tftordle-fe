import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutes } from "./_constants/routes.contant";

const routes: Routes = [
  {
    path: "",
    redirectTo: AppRoutes.HOME,
    pathMatch: "full",
  },
  {
    path: AppRoutes.HOME,
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [],
  },
  {
    path: AppRoutes.TRAIT,
    loadChildren: () =>
      import("./pages/trait-guess/trait-guess.module").then(
        (m) => m.TraitGuessModule
      ),
    canActivate: [],
  },
  {
    path: AppRoutes.CHAMPION,
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
