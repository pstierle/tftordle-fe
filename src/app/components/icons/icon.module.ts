import { QuestionIconMarkComponent } from './question-mark-icon.compontent';
import { NgModule } from '@angular/core';
import { CheckIconComponent } from './check-icon.compontent';

@NgModule({
  declarations: [QuestionIconMarkComponent, CheckIconComponent],
  exports: [QuestionIconMarkComponent, CheckIconComponent],
})
export class IconModule {}
