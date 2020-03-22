import { LabelizePipe } from "./labelize.pipe"

describe("LabelizePipe", () => {
  test(`Treats capitals as word boudary`, () => {
    const pipe = new LabelizePipe()
    expect(pipe.transform("camelCasedKey")).toEqual("camel cased key")
  })

  test(`Treats numbers as word boudary`, () => {
    const pipe = new LabelizePipe()
    expect(pipe.transform("camel1Cased2Key")).toEqual("camel 1 cased 2 key")
  })
})
