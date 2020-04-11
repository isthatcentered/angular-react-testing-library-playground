import { UnlessDirective } from "./unless.directive"
import { render } from "../../../testing/helpers"

describe(` `, () => {
  test(`Displays the item if condition is false`, async () => {
    const { getByDirective, ...utils } = await render(UnlessDirective, {
      template: `
      <p *appUnless="isEmpty">I should show up </p>
    `,
      componentProperties: { isEmpty: false },
    })

    expect(utils.container).toHaveTextContent(/i should show up/i)
  })

  test(`Hides the item if condition is true`, async () => {
    const { ...utils } = await render(UnlessDirective, {
      template: `
      <p *appUnless="isEmpty">I should not show up </p>
    `,
      componentProperties: { isEmpty: true },
    })

    expect(utils.container).not.toHaveTextContent(/i should show up/i)
  })
})
