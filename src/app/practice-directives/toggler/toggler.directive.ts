import { Directive, HostBinding, Input, OnInit } from "@angular/core"

@Directive({
  selector: "[toggler]",
})
export class TogglerDirective implements OnInit {
  @HostBinding("attr.role")
  @Input()
  role: string = "switch"

  @HostBinding("attr.aria-checked")
  @Input()
  on: boolean = false

  ngOnInit(): void {}
}
