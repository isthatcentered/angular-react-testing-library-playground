import { Component, Input, OnInit } from "@angular/core"
import { AbstractControl, FormGroup } from "@angular/forms"
import { Observable, Subject } from "rxjs"
import { map, mapTo, startWith, tap } from "rxjs/operators"

@Component({
  selector: "examples-form-debug",
  template: `
    <pre *ngIf="stats$ | async as stats" class="text-xs p-4 pb-0">{{
      stats | json
    }}</pre>
  `,
  styles: [],
})
export class FormDebugComponent implements OnInit {
  @Input()
  form!: AbstractControl

  stats$!: Observable<Record<string, any>>

  constructor() {}

  ngOnInit() {
    this.stats$ = this.form?.valueChanges.pipe(
      startWith(this.form),
      mapTo(this.form!),
      map(form => ({
        status: form.status,
        errors: form.errors,
        value: form.value,
        states: {
          pending: form.pending,
          dirty: form.dirty,
          valid: form.valid,
          invalid: form.invalid,
          disabled: form.disabled,
          pristine: form.pristine,
          touched: form.touched,
        },
      })),
    )
  }
}
