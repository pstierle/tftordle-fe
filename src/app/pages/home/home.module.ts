import { NgModule } from "@angular/core";
import { HomePage } from "./home.page";
import { HomeRoutingModule } from "./home-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [HomePage],
  imports: [HomeRoutingModule, CommonModule],
  providers: [],
})
export class HomeModule {}
