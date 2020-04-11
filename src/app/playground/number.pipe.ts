import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
  name: "number",
})
export class NumberPipe implements PipeTransform {
  transform(value: string | number, ..._: any[]): any {
    return parseInt(value.toString())
  }
}
