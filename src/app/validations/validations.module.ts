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

enum FormStatus {
  INITIAL,
  PENDING,
  SUCCESS,
  ERROR,
}

@Component({
  selector: "validations-matching-emails-validation",
  template: `
    <form (ngSubmit)="handleSubmit()">
      <label class="block mb-4">
        <span>Email</span>
        <input
          #emailRef
          [formControl]="this.form.get('email')"
          appInput
          [attr.aria-invalid]="!!this.form.get('email')?.errors"
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
        <input
          #confirmEmailRef
          [formControl]="this.form.get('confirmEmail')"
          appInput
          type="email"
          aria-describedby="confirmEmail-errors"
        />
        <div id="confirmEmail-errors" aria-live="polite">
          {{ nonMatchingEmails }}
        </div>
      </label>

      <!-- Form status-->
      <div
        role="status"
        *ngIf="status === FormStatus.PENDING"
        class="border-2 border-orange-400 p-4 mb-4"
      >
        Saving new email
      </div>
      <div
        role="status"
        *ngIf="status === FormStatus.SUCCESS"
        class="border-2 border-green-600 text-green-700 p-4 mb-4"
      >
        Email saved 👌
      </div>
      <div
        role="status"
        *ngIf="status === FormStatus.ERROR"
        class="border-2 border-red-500 text-red-600 p-4 mb-4"
      >
        Could not save email
      </div>

      <!-- Error recap-->
      <div
        class="border-2 border-red-500 p-4 pb-2 mb-4"
        *ngIf="submitted && form.errors"
      >
        <p class="text-red-600 mb-2">
          The form has the following errors that need to be corrected
        </p>
        <ul class="pl-2">
          <li class="mb-2">
            <button
              class="block underline text-red-600"
              (click)="emailRef.focus()"
              *ngIf="invalidEmail"
            >
              Email is not valid
            </button>
          </li>
          <li class="mb-2">
            <button
              class="block underline text-red-600"
              (click)="emailRef.focus()"
              *ngIf="requiredEmail"
            >
              Email is required
            </button>
          </li>
          <li class="mb-2">
            <button
              class="block underline text-red-600"
              (click)="confirmEmailRef.focus()"
              *ngIf="nonMatchingEmails"
            >
              Email and confirmation email must match
            </button>
          </li>
        </ul>
      </div>

      <button appButton type="submit" class="">Change email</button>

      <examples-form-debug [form]="form"></examples-form-debug>
    </form>
  `,
})
export class MatchingEmailsValidationComponent {
  status = FormStatus.INITIAL

  get submitted(): boolean {
    console.log( "get", this.status !== FormStatus.INITIAL )
    return this.status !== FormStatus.INITIAL
  }

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
  FormStatus = FormStatus

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

  handleSubmit() {
    this.status = FormStatus.PENDING

    setTimeout(() => {
      return (this.status = this.form.valid
        ? FormStatus.SUCCESS
        : FormStatus.ERROR)
    }, 2000)
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
