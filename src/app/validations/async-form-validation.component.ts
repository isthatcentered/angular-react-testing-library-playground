import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@ng-stack/forms"
import { AsyncValidatorFn } from "@ng-stack/forms/lib/types"
import { of } from "rxjs"
import { delay, mapTo, take } from "rxjs/operators"

const usernameAvailableAsyncValidator: AsyncValidatorFn<{
  usernamealreadytaken: boolean
}> = () =>
  of(null).pipe(delay(1000), mapTo({ usernamealreadytaken: true }), take(1))

@Component({
  selector: "validations-async-form-validation",
  template: `
    <form [formGroup]="form">
      <label class="block">
        <span>Username</span>
        <input
          class="mb-4"
          formControlName="username"
          appInput
          type="text"
          aria-describedby="username-report"
        />
        <span class="block" aria-live="polite" id="username-report">
          <span *ngIf="form.get('username')?.pending"
            >Making sure username is not available...</span
          >
          <span *ngIf="usernameAlreadyTakenError"
            >Nope, username already taken. It's a worldwide web after all
            😌</span
          >
        </span>
      </label>
      <!--      <examples-form-debug [form]="form.get('username')"></examples-form-debug>-->
      <button appButton type="submit">Save</button>
    </form>
  `,
})
export class AsyncFormValidationComponent implements OnInit {
  form!: FormGroup<
    { username: string },
    { requred: true; usernamealreadytaken: true }
  >

  ngOnInit(): void {
    this.form = new FormGroup<
      { username: string },
      { requred: true; usernamealreadytaken: true }
    >({
      username: new FormControl("", {
        validators: [Validators.required],
        asyncValidators: [usernameAvailableAsyncValidator],
      }),
    })
  }

  get usernameAlreadyTakenError(): boolean {
    return !!this.form.getError("usernamealreadytaken", "username")
  }
}
