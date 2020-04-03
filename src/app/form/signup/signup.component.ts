import { Component, OnDestroy, OnInit } from "@angular/core"
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms"
import { ReplaySubject } from "rxjs"
import { startWith, takeUntil, tap } from "rxjs/operators"

const matchingFields = (...fieldNames: string[]): ValidatorFn => control => {
  const controls = fieldNames.map(name => control.get(name))

  if (controls.find(control => control?.pristine)) return null

  const uniqueValues = new Set(controls.map(control => control?.value))

  return uniqueValues.size === 1
    ? null
    : {
        notamatch: true,
      }
}

@Component({
  selector: "app-signup",
  template: `
    <form [formGroup]="form">
      <app-text-control
        class="mb-4"
        name="firstname"
        placeholder="John"
        [group]="form"
      ></app-text-control>

      <app-text-control
        class="mb-4"
        name="lastname"
        placeholder="Rambo"
        [group]="form"
      ></app-text-control>

      <fieldset>
        <legend class="">
          Email
        </legend>

        <app-text-control
          dataTestId="email"
          label="false"
          class="mb-4"
          name="email"
          type="email"
          placeholder="your@email.com"
          [group]="emailGroup"
        ></app-text-control>

        <app-text-control
          *ngIf="emailGroup.get('email')!.value"
          label="false"
          class="mb-4"
          name="confirmEmail"
          type="email"
          placeholder="Confirm email"
          [group]="emailGroup"
        ></app-text-control>
        <!--        {{ emailGroup.errors?.notamatch && "Confirmation email not matching" }}-->
      </fieldset>

      <app-text-control
        class="mb-4"
        name="phone"
        placeholder="+33 6 79 78 77 70"
        [group]="form"
      ></app-text-control>

      <fieldset>
        <legend>Notifications</legend>
        <label>
          <input type="radio" value="email" formControlName="notifications" />
          <span>Email</span>
        </label>
        <label>
          <input type="radio" value="text" formControlName="notifications" />
          <span>Text</span>
        </label>
      </fieldset>

      <app-text-control
        class="mb-4"
        name="rating"
        placeholder="1-5"
        [group]="form"
      ></app-text-control>

      <app-text-control
        class="mb-4"
        name="sendCatalog"
        placeholder="yup|nope"
        [group]="form"
      ></app-text-control>

      <button type="submit">Submit</button>
      <pre>{{ emailGroup.errors | json }}</pre>
      <pre>{{ form.value | json }}</pre>
      <pre>{{ form.valid | json }}</pre>
    </form>
  `,
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup = this._fb.group({
    firstname: ["", Validators.required],
    lastname: ["", [Validators.minLength(3), Validators.maxLength(5)]],
    emailGroup: this._fb.group(
      {
        email: ["", Validators.email],
        confirmEmail: [
          "",
          [
            Validators.email,
            (control: AbstractControl) => {
              const email = control.parent?.get("email")
              return control.touched &&
                !!email?.value &&
                email?.value === control.value
                ? null
                : { notamatch: true }
            },
          ],
        ],
      },
      {
        validators: [matchingFields("email", "confirmEmail")],
      },
    ),
    phone: [""],
    notifications: [""],
    rating: [""],
    sendCatalog: [""],
  })

  private _destroy$ = new ReplaySubject<void>()

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith(this.form.value),
      takeUntil(this._destroy$),
    )
    // .subscribe()

    this.form
      .get("notifications")
      ?.valueChanges.pipe(
        startWith(this.form.get("notifications")?.value),
        tap(value => {
          const control = this.form.get("phone")!
          if (value !== "text") {
            control.clearValidators()
          } else {
            control.setValidators(Validators.required)
          }
          control.updateValueAndValidity()
        }),
        takeUntil(this._destroy$),
      )
      .subscribe()
  }

  get emailGroup(): FormGroup {
    return this.form.get("emailGroup") as FormGroup
  }

  ngOnDestroy(): void {
    this._destroy$.next()
  }
}
