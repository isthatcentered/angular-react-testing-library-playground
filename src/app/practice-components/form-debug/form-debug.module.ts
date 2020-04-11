import { Component, Input, NgModule, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AbstractControl } from "@angular/forms"
import { Observable } from "rxjs"
import { map, mapTo, startWith } from "rxjs/operators"

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

@NgModule({
  declarations: [FormDebugComponent],
  exports: [FormDebugComponent],
  imports: [CommonModule],
})
export class FormDebugModule {}
