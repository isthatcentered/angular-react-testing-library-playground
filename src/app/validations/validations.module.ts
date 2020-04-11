import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ValidationsRoutingModule } from "./validations-routing.module"
import {
  CellWatcherDirective,
  ValidationsComponent,
} from "./validations.component"
import { FormsModule } from "@angular/forms"
import { MatchingEmailsValidationComponent } from "./matching-emails.component.module"
import { NgStackFormsModule } from "@ng-stack/forms"
import { FormWithAsyncDataComponent } from "./form-with-async-data.component"
import { DynamicFormControlsComponent } from "./dynamic-form-controls.component"
import { AsyncFormValidationComponent } from "./async-form-validation.component"
import {
  ProfileFormComponent,
  ControlValueAccessorFormComponentsComponent,
} from "./control-value-accessor-form-components.component"
import { PracticeComponentsModule } from "../practice-components/practice-components.module"
import { PracticeDirectivesModule } from "../practice-directives/practice-directives.module"

@NgModule({
  declarations: [
    ProfileFormComponent,
    ControlValueAccessorFormComponentsComponent,
    AsyncFormValidationComponent,
    FormWithAsyncDataComponent,
    CellWatcherDirective,
    ValidationsComponent,
    MatchingEmailsValidationComponent,
    DynamicFormControlsComponent,
  ],
  imports: [
    NgStackFormsModule,
    CommonModule,
    FormsModule,
    ValidationsRoutingModule,
    PracticeComponentsModule,
    PracticeDirectivesModule,
  ],
})
export class ValidationsModule {}
