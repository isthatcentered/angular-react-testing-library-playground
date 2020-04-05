import { Directive, HostBinding, Input, Self } from "@angular/core"
import { NgControl } from "@angular/forms"

type FormControlStatus = "VALID" | "INVALID" | "PENDING" | "DISABLED"

export interface ValidationBorderConfig {
  borderWidth: string
  colors: Record<FormControlStatus, string>
}

@Directive({
  selector: "[appValidationBorder]",
})
export class ValidationBorderDirective {
  @Input()
  config!: ValidationBorderConfig

  @HostBinding("style.borderColor")
  get borderColor(): string {
    return this.showValidation
      ? this.config.colors[this.control.status as FormControlStatus]
      : ""
  }

  @HostBinding("style.borderStyle")
  get borderStyle(): string {
    return this.showValidation ? "solid" : ""
  }

  @HostBinding("style.borderWidth")
  get borderWidth(): string {
    return this.showValidation ? this.config.borderWidth : ""
  }

  get showValidation() {
    return this.control.dirty || this.control.touched
  }

  constructor(@Self() private control: NgControl) {}
}
