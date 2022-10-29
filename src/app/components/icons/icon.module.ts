import { ShareIconComponent } from "./share-icon.component";
import { GoldIconComponent } from "./gold-icon.component";
import { UpArrowIconComponent } from "./up-arrow-icon";
import { QuestionIconMarkComponent } from "./question-mark-icon.compontent";
import { NgModule } from "@angular/core";
import { CheckIconComponent } from "./check-icon.compontent";

@NgModule({
  declarations: [
    QuestionIconMarkComponent,
    CheckIconComponent,
    UpArrowIconComponent,
    GoldIconComponent,
    ShareIconComponent,
  ],
  exports: [
    QuestionIconMarkComponent,
    CheckIconComponent,
    UpArrowIconComponent,
    GoldIconComponent,
    ShareIconComponent,
  ],
})
export class IconModule {}
