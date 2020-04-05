import { RangeDirective } from "./range.directive"
import { render } from "../../helpers"

describe(`${RangeDirective.name}`, () => {
  test(`Creates an item for each number inside range`, async () => {
    const rangeStart = 20,
      rangeEnd = 30,
      { ...utils } = await render(RangeDirective, {
        template: `
        <p *appRange="[rangeStart,rangeEnd]; let num">{{num}}</p>
      `,
        componentProperties: {
          rangeStart,
          rangeEnd,
        },
      }),
      generated = utils.container.getElementsByTagName("p")

    expect(generated).toHaveLength(rangeEnd - rangeStart)
  })

  test(`Exposes the current iteration number`, async () => {
    const rangeStart = 20,
      rangeEnd = 30,
      { ...utils } = await render(RangeDirective, {
        template: `
        <p *appRange="[rangeStart,rangeEnd]; let num">{{num}}</p>
      `,
        componentProperties: {
          rangeStart,
          rangeEnd,
        },
      }),
      generated = Array.from(utils.container.getElementsByTagName("p"))

    Array.from(generated).forEach((item, index) => {
      expect(item).toHaveTextContent((index + rangeStart).toString())
    })
  })
})
