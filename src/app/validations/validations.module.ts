import { Component, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { ValidationsRoutingModule } from "./validations-routing.module"
import {
  CellWatcherDirective,
  ValidationsComponent,
} from "./validations.component"
import { ExamplesModule } from "../examples/examples.module"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FormControl, FormGroup, Validators } from "@ng-stack/forms"
import { SharedModule } from "../shared/shared.module"
import matchingFieldsValidator from "./validators/matching-fields.validator"
import { Maybe } from "../form/form-control/text-control.component"

@Component({
  selector: "validations-matching-emails-validation",
  template: `
    <form [formGroup]="form">
      <label class="block mb-4">
        <span>Email</span>
        <input
          formControlName="email"
          appInput
          type="email"
          aria-describedby="email-errors"
        />
        <div class="mt-2" aria-live="polite" id="email-errors">
          {{ invalidEmail }}
          {{ requiredEmail }}
        </div>
      </label>
      <label class="block mb-4">
        <span>Confirm Email</span>
        <input formControlName="confirmEmail" appInput type="email" />
      </label>
      <div aria-live="polite">{{ nonMatchingEmails }}</div>
    </form>
  `,
})
export class MatchingEmailsValidationComponent {
  form = new FormGroup<
    { email: string; confirmEmail: string },
    { required: true; mismatch: true }
  >(
    {
      email: new FormControl<string, { required: true; mismatch: true }>("", {
        validators: [Validators.required, Validators.email],
      }),
      confirmEmail: new FormControl<string, { required: true; mismatch: true }>(
        "",
        [Validators.required],
      ),
    },
    [matchingFieldsValidator("email", "confirmEmail")],
  )

  get invalidEmail(): string | undefined {
    let email = this.form.get("email")
    return email?.touched && email?.errors?.email
      ? "Dude, that's obviously not an email"
      : undefined
  }

  get requiredEmail(): string | undefined {
    let email = this.form.get("email")
    return email?.touched && email?.errors?.required
      ? "Yo, that shit not optional man"
      : undefined
  }

  get nonMatchingEmails(): Maybe<string> {
    return this.form.get("confirmEmail")?.touched && this.form.errors?.mismatch
      ? "Bitch those arent matching, you blind or what ?!"
      : undefined
  }
}

@NgModule({
  declarations: [
    CellWatcherDirective,
    ValidationsComponent,
    MatchingEmailsValidationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ValidationsRoutingModule,
    ExamplesModule,
  ],
})
export class ValidationsModule {}
