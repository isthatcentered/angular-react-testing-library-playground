import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ValidationsRoutingModule } from "./validations-routing.module"
import {
  CellWatcherDirective,
  ValidationsComponent,
} from "./validations.component"
import { ExamplesModule } from "../examples/examples.module"
import { FormsModule } from "@angular/forms"
import { SharedModule } from "../shared/shared.module"
import { MatchingEmailsValidationComponent } from "./matching-emails.component.module"
import { NgStackFormsModule } from "@ng-stack/forms"
import { FormWithAsyncDataComponent } from "./form-with-async-data.component"
import { DynamicFormControlsComponent } from "./dynamic-form-controls.component"
import { AsyncFormValidationComponent } from "./async-form-validation.component"
import {
  ProfileFormComponent,
  ReusableFormComponentsComponent,
} from "./reusable-form-components.component"

@NgModule({
  declarations: [
    ProfileFormComponent,
    ReusableFormComponentsComponent,
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
    SharedModule,
    ValidationsRoutingModule,
    ExamplesModule,
  ],
})
export class ValidationsModule {}
