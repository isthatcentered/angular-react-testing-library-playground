import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PaddedValueDirective } from "./padded-value.directive"
import { TogglerDirective } from "./toggler.directive"
import { ButtonDirective } from "./button.directive"
import { ClickOutsideDirective } from "./click-outside.directive"

const declarations = [
  PaddedValueDirective,
  TogglerDirective,
  ButtonDirective,
  ClickOutsideDirective,
]

@NgModule({
  declarations: [...declarations],
  exports: [...declarations],
  imports: [CommonModule],
})
export class DirectivesModule {}
