import { HasValuePipe } from "./has-value.pipe"

describe("HasValuePipe", () => {
  test("Empty values return false", () => {
    const pipe = new HasValuePipe()
    expect(pipe.transform("")).toBe(false)
    expect(pipe.transform(undefined)).toBe(false)
    expect(pipe.transform(null)).toBe(false)
    expect(pipe.transform(0)).toBe(false)
    expect(pipe.transform([])).toBe(false)
    expect(pipe.transform({})).toBe(false)
  })

  test("0 is not empty", () => {
    const pipe = new HasValuePipe()
    expect(pipe.transform("hello")).toBe(true)
    expect(pipe.transform(1)).toBe(true)
    expect(pipe.transform(["a"])).toBe(true)
    expect(pipe.transform({hello:""})).toBe(true)
  })
})
