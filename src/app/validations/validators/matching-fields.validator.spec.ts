import { FormControl, FormGroup } from "@ng-stack/forms"
import matchingFieldsValidator from "./matching-fields.validator"
import { prop } from "ramda"

describe(`Empty confirm`, () => {
  test(`FormGroup is invalid`, () => {
    const group = new FormGroup({
      field1: new FormControl("some_value"),
      field2: new FormControl(""),
    })

    expect(matchingFieldsValidator("field1", "field2")(group)).toEqual({
      mismatch: true,
    })
  })
})

describe(`Non matching confirm`, () => {
  test(`FormGroup is invalid`, () => {
    const group = new FormGroup({
      field1: new FormControl("some_value"),
      field2: new FormControl("another_value"),
    })

    expect(matchingFieldsValidator("field1", "field2")(group)).toEqual({
      mismatch: true,
    })
  })
})

describe(`Both fields empty`, () => {
  test(`FormGroup is valid`, () => {
    const group = new FormGroup({
      field1: new FormControl(""),
      field2: new FormControl(""),
    })

    expect(matchingFieldsValidator("field1", "field2")(group)).toEqual(null)
  })
})

describe(`Matching confirm`, () => {
  test(`FormGroup is valid`, () => {
    const group = new FormGroup({
      field1: new FormControl("value"),
      field2: new FormControl("value"),
    })

    expect(matchingFieldsValidator("field1", "field2")(group)).toEqual(null)
  })
})
