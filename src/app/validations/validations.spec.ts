import { FormArray, FormControl, FormGroup, Validators } from "@ng-stack/forms"

test(`I can patch nested form groups`, () => {
  const group = new FormGroup({
    address: new FormGroup({
      street: new FormControl(""),
      adds: new FormGroup({ blah: new FormControl("") }),
    }),
  })

  const patch = {
    address: {
      street: "unknown",
      adds: {
        blah: "indeed",
      },
    },
  }

  group.patchValue(patch)

  expect(group.value).toEqual(patch)
})

test(`I can patch nested form arrays`, () => {
  const group = new FormGroup<{ address: { street: string }[] }>({
    address: new FormArray([
      new FormGroup({
        street: new FormControl(""),
      }),
    ]),
  })

  const patch = {
    address: [
      {
        street: "unknown",
      },
    ],
  }

  group.patchValue(patch)

  expect(group.value).toEqual(patch)
})

test(`Testing assigned validators`, () => {
  const email = new FormControl("", Validators.required),
    field2 = new FormControl("")

  const group = new FormArray([], Validators.required)

  expect(group.errors).toEqual({
    required: true,
  })
})

test(`Typed errors`, () => {})
