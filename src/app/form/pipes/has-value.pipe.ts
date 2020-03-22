import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "hasValue",
})
export class HasValuePipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (typeof value === "object" && typeof value !== null) {
      return Array.isArray(value)
        ? !!value.length
        : !!value && !!Object.keys(value).length
    }

    return !!value
  }
}
