import {
  ValidationBorderConfig,
  ValidationBorderDirective,
} from "./validation-border.directive"
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms"
import { FormControl } from "@ng-stack/forms"
import { render, scenario } from "../../../testing/helpers"
import {
  createInvalid,
  createValid,
  markAsDirty,
} from "../../../testing/controls"

describe("ValidationBorderDirective", () => {
  scenario(`Prisitine input`, () => {
    test(`No styles added`, async () => {
      const { input } = await makeSut({})

      expect(input.style.borderStyle).toBe("")
      expect(input.style.borderWidth).toBe("")
      expect(input.style.borderColor).toBe("")
    })
  })

  scenario(`Dirty, valid`, () => {
    test(`Displays "valid" border`, async () => {
      const { utils, input, props } = await makeSut({
        config: <ValidationBorderConfig>{
          borderWidth: "2px",
          colors: {
            VALID: "green",
          },
        },
        control: markAsDirty(createValid()),
      })

      expect(input.style.borderStyle).toBe("solid")
      expect(input.style.borderWidth).toBe(props.config.borderWidth)
      expect(input.style.borderColor).toBe(props.config.colors?.VALID)
    })
  })
  scenario(`Dirty, invalid`, () => {
    test(`Displays "valid" border`, async () => {
      const { utils, input, props } = await makeSut({
        config: <ValidationBorderConfig>{
          borderWidth: "2px",
          colors: {
            INVALID: "red",
          },
        },
        control: markAsDirty(createInvalid()),
      })

      expect(input.style.borderStyle).toBe("solid")
      expect(input.style.borderWidth).toBe(props.config.borderWidth)
      expect(input.style.borderColor).toBe(props.config.colors?.INVALID)
    })
  })
})

async function makeSut({
  control = new FormControl(""),
  config = {},
}: {
  config?: Partial<ValidationBorderConfig>
  control?: AbstractControl
}) {
  const utils = await render(ValidationBorderDirective, {
      template: `
          <input [config]="config" [formControl]="control" appValidationBorder type="text" />
          `,
      componentProperties: { control, config },
      imports: [FormsModule, ReactiveFormsModule],
    }),
    input = <HTMLInputElement>(
      utils.getByDirective(ValidationBorderDirective).nativeElement
    )

  return { input, props: { config, control }, utils: utils, debug: utils.debug }
}
