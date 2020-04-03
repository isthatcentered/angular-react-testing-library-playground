import { FormGroup, ValidatorFn } from "@ng-stack/forms"

const matchingFieldsValidator: (
  fied1Name: string,
  field2Name: string,
) => ValidatorFn<{
  mismatch: true
}> = (field1, field2) => control => {
  const group = control as FormGroup<any>
  const areMatching =
    group.controls[field1].value === group.controls[field2].value
  return !areMatching ? { mismatch: true } : null
}

export default matchingFieldsValidator
