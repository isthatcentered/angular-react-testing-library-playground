import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core"

@Directive({
  selector: "[appInput]",
})
export class InputDirective implements OnInit {
  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    ;[
      "shadow-sm",
      "block",
      "w-full",
      "pl-3",
      "pr-9",
      "py-2",
      "rounded",
      "border",
      "border-gray-300",
      "bg-white",
      "text-sm",
      "leading-5",
      "font-medium",
      "text-gray-700",
      "hover:text-gray-500",
      "focus:z-10",
      "focus:outline-none",
      "focus:border-blue-300",
      "focus:shadow-outline-blue",
      "active:bg-gray-100",
      "active:text-gray-700",
      "transition",
      "ease-in-out",
      "duration-150",
    ].forEach(this._renderer.addClass.bind(this, this._el.nativeElement))
  }
}
