import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core"

@Directive({
  selector: "[appButton]",
})
export class ButtonDirective implements OnInit {
  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    ;[
      "inline-flex",
      "items-center",
      "px-4",
      "py-2",
      "border",
      "border-gray-300",
      "text-sm",
      "leading-5",
      "font-medium",
      "rounded-md",
      "text-gray-700",
      "bg-white",
      "hover:text-gray-500",
      "focus:outline-none",
      "focus:border-blue-300",
      "focus:shadow-outline-blue",
      "active:text-gray-800",
      "active:bg-gray-50",
      "transition",
      "ease-in-out",
      "duration-150",
    ].forEach(this._renderer.addClass.bind(this, this._el.nativeElement))
  }
}
