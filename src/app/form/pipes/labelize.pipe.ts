import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "labelize"
})
export class LabelizePipe implements PipeTransform {
  transform(value: any): unknown {
    if (typeof value === "string" || typeof value === "number")
      return value.toString().replace(/(^[a-z]+)|([A-Z\d][a-z]*)/g, "$& ").toLowerCase().trim();

    return value;
  }
}
