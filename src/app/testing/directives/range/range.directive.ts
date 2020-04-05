import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core"

@Directive({
  selector: "[appRange]",
})
export class RangeDirective {
  @Input()
  set appRange([start, end]: number[]) {
    this.vcr.clear()

    this.generateRange(start, end).forEach(num => {
      this.vcr.createEmbeddedView(this.tpl, {
        $implicit: num,
      })
    })
  }

  constructor(private vcr: ViewContainerRef, private tpl: TemplateRef<any>) {}

  private generateRange(from: number, to: number): number[] {
    return Array.from({ length: to - from }, (_, ind) => from + ind)
  }
}
