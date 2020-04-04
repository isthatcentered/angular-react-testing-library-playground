import {
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from "@angular/core"
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
import { NgStackFormsModule, ValidatorsModel } from "@ng-stack/forms"
import { FormWithAsyncDataComponent } from "./form-with-async-data.component"
import { DynamicFormControlsComponent } from "./dynamic-form-controls.component"
import { AsyncFormValidationComponent } from "./async-form-validation.component"
import {
  ProfileFormComponent,
  ReusableFormComponentsComponent,
} from "./reusable-form-components.component"
import { ControlType } from "@ng-stack/forms/lib/types"
import { Maybe } from "../form/form-control/text-control.component"
import { pipe } from "fp-ts/lib/pipeable"
import { evolve } from "ramda"

class AppValidatorsModel extends ValidatorsModel {}

type EvolveAppValidatorModel = {
  [K in keyof AppValidatorsModel]: (errorData: AppValidatorsModel[K]) => string
}

@Component({
  selector: "shared-control-errors",
  template: `
    <div aria-live="polite" *ngFor="let error of controlErrors">
      <ng-container *ngTemplateOutlet="template; context: { $implicit: error }">
      </ng-container>
    </div>
  `,
})
export class ControlErrorComponent {
  @Input()
  control!: ControlType<any, AppValidatorsModel>

  @ContentChild(TemplateRef)
  template: Maybe<TemplateRef<any>>

  evolveErrors = evolve<EvolveAppValidatorModel>({
    required: () => "C'mon man, that shit required",
    email: () => "Dude, that's obviousy not a valid email",
    fileMaxSize: () => "fileMaxSize",
    fileRequired: () => "fileRequired",
    filesMaxLength: () => "filesMaxLength",
    filesMinLength: () => "filesMinLength",
    max: ({ max, actual }) =>
      `Nice, you're only ${actual - max} units over the limit dumbass`,
    min: ({ actual, min }) =>
      `You're ${min - actual} units short. Title of your sextape`,
    maxlength: ({ actualLength, requiredLength }) =>
      `Nice, you're only ${actualLength -
        requiredLength} characters over the limit dumbass`,
    minlength: ({ actualLength, requiredLength }) =>
      `You're missing ${requiredLength - actualLength} characters.`,
    pattern: () => "pattern",
  })

  get controlErrors(): string[] {
    if (!this.control.touched || !this.control.errors) return []
    return pipe(this.evolveErrors(this.control.errors), Object.values)
  }
}

@NgModule({
  declarations: [
    ControlErrorComponent,
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
