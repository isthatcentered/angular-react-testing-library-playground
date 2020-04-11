import { AbstractControl } from "@angular/forms"
import { FormControl, Validators } from "@ng-stack/forms"

export const markAsTouched = (control: AbstractControl) => {
  control.markAsTouched()
  return control
}
export const markAsDirty = (control: AbstractControl) => {
  control.markAsDirty()
  return control
}

export const createInvalid = () => new FormControl("", Validators.required)
export const createValid = () => new FormControl("", )
