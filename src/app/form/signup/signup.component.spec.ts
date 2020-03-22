import { SignupComponent } from "./signup.component"
import {
  Matcher,
  render,
  SelectorMatcherOptions,
} from "@testing-library/angular"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import "@testing-library/jest-dom"
import {
  ControlErrorComponent,
  LabelDirective,
  Maybe,
  TextControlComponent,
} from "../form-control/text-control.component"
import { LabelizePipe } from "../pipes/labelize.pipe"
import { Renderer2 } from "@angular/core"

describe("SignupComponent", () => {
  test(`Phone number is required when text notifications are selected`, async () => {
    const page = await makeSignupForm()

    expect(page.formError(/phone/i)).toBeNull()

    page.click(/text/i, { selector: 'input[type="radio"]' })

    expect(page.formError(/phone/i)).toHaveTextContent(/required/i)
  })

  test(`Filling-in the email input displays the "Confirm email" field`, async () => {
    const page = await makeSignupForm()

    expect(() => page.getByLabelText(/confirm email/i)).toThrow()

    await page.utils.type(page.getByTestId(/email/i), "email")

    expect(() => page.getByLabelText(/confirm email/i)).not.toThrow()
  })

  test(`Non matching emails are invalid`, async () => {
    const page = await makeSignupForm(),
      enterEmail = async (value: string) =>
        await page.utils.type(page.getByTestId(/email/i), value),
      enterConfirmationEmail = async (value: string) =>
        await page.type(/confirm email/, value)

    await enterEmail("email@email.com")

    await enterConfirmationEmail("nope@nope.com")

    expect(() => page.getByText(/non matching fields/i)).not.toThrow()
  })
})

async function makeSignupForm() {
  const { click: utilsClick, type: utilsType, ...utils } = await render(
    SignupComponent,
    {
      declarations: [
        TextControlComponent,
        LabelDirective,
        LabelizePipe,
        ControlErrorComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [Renderer2],
    },
  )

  const click = (label: Matcher, options?: SelectorMatcherOptions): void => {
    utilsClick(utils.getByLabelText(label, options))
  }

  const type = async (
    label: Matcher,
    value: string,
    options?: SelectorMatcherOptions,
  ): Promise<void> => {
    await utilsType(utils.getByLabelText(label, options), value)
  }

  const formError = (label: Matcher): Maybe<Element> => {
    const input = utils.getByLabelText(label)! as HTMLInputElement

    const error = input.closest("label")!.querySelector('[id="phone-errors"]')

    return error
  }

  return {
    ...utils,
    utils: { type: utilsType, click: utilsClick },
    type,
    click,
    formError,
  }
}
