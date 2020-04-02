import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core"

@Directive({
  selector: "[appClickOutside]",
})
export class ClickOutsideDirective {
  @Output()
  onClickOutside = new EventEmitter<void>()

  constructor(private elementRef: ElementRef) {}

  @HostListener("document:click", ["$event.target"])
  public onClick(target: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.onClickOutside.emit()
    }
  }
}
