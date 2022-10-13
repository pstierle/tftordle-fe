import { UpArrowIconComponent } from './up-arrow-icon';
import { QuestionIconMarkComponent } from './question-mark-icon.compontent';
import { NgModule } from '@angular/core';
import { CheckIconComponent } from './check-icon.compontent';

@NgModule({
  declarations: [QuestionIconMarkComponent, CheckIconComponent, UpArrowIconComponent],
  exports: [QuestionIconMarkComponent, CheckIconComponent, UpArrowIconComponent],
})
export class IconModule {}
