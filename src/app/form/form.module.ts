import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SignupComponent } from "./signup/signup.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import {
  ControlErrorComponent,
  LabelDirective,
  TextControlComponent,
} from './form-control/text-control.component';
import { LabelizePipe } from "./pipes/labelize.pipe";
import { HasValuePipe } from './pipes/has-value.pipe'

@NgModule({
  declarations: [
    ControlErrorComponent,
    SignupComponent,
    TextControlComponent,
    LabelizePipe,
    LabelDirective,
    HasValuePipe,
  ],
  exports: [SignupComponent, FormsModule, ReactiveFormsModule, HasValuePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FormModule {}
