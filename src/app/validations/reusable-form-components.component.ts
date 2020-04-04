import { Component, forwardRef, OnDestroy, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@ng-stack/forms"
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from "@angular/forms"
import { Subscription } from "rxjs"

type Profile = { firstname: string; lastname: string; email: string }

@Component({
  selector: "profile-form",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    },
  ],
  template: `
    <div [formGroup]="form">
      <label for="first-name"
        >First Name
        <input
          appInput
          class="mb-4"
          formControlName="firstname"
          id="first-name"
        />
      </label>

      <label for="last-name"
        >Last Name
        <input
          appInput
          class="mb-4"
          formControlName="lastname"
          id="last-name"
        />
      </label>

      <label for="email"
        >Email
        <input
          appInput
          class="mb-4"
          formControlName="email"
          type="email"
          id="email"
        />
      </label>

      <div
        *ngIf="emailControl.touched && emailControl.hasError('required')"
        class="error"
      >
        email is required
      </div>
    </div>
  `,
})
export class ProfileFormComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  form = new FormGroup<Profile>({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl("", [Validators.required]),
  })

  subscriptions: Subscription[] = []

  ngOnInit(): void {
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value)
        this.onTouched()
      }),
    )
  }

  get firstnameControl(): FormControl {
    return this.form.get("firstname")!
  }

  get lastnameControl(): FormControl {
    return this.form.get("lastname")!
  }

  get emailControl(): FormControl {
    return this.form.get("email")!
  }

  get value(): Profile {
    return this.form.value
  }

  set value(value: Profile) {
    this.form.setValue(value)

    this.onChange(value)

    this.onTouched()
  }

  ngOnDestroy(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  onChange(_: Profile) {}

  onTouched() {}

  writeValue(value: Profile) {
    if (value) {
      this.value = value
    }
    if (value === null) {
      this.form.reset()
    }
  }

  registerOnTouched(fn: () => any) {
    this.onTouched = fn
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false } }
  }
}

@Component({
  selector: "validations-reusable-form-components",
  template: `
    <form [formGroup]="form">
      <profile-form formControlName="profile"></profile-form>
    </form>
    <examples-form-debug [form]="form"></examples-form-debug>
    <examples-form-debug [form]="form.get('profile')"></examples-form-debug>
  `,
})
export class ReusableFormComponentsComponent implements OnInit {
  form!: FormGroup<{ profile: any }>

  ngOnInit() {
    this.form = new FormGroup<{ profile: any }>({
      profile: new FormControl(),
    })
  }
}
