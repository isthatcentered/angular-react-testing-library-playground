import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { PracticeDirectivesRoutingModule } from "./practice-directives-routing.module"
import { PracticeDirectiveHomeComponent } from "./practice-directive-home.component"
import { ValidationBorderDirective } from "./validation-border/validation-border.directive"
import { UnlessDirective } from "./unless/unless.directive"
import { HasRoleDirective } from "./has-role/has-role.directive"
import { RangeDirective } from "./range/range.directive"
import { ClickOutsideDirective } from "./click-outside/click-outside.directive"
import { ButtonDirective } from "./button/button.directive"
import { TogglerDirective } from "./toggler/toggler.directive"
import { PaddedValueDirective } from "./padded-value/padded-value.directive"
import { PracticeComponentsModule } from "../practice-components/practice-components.module"
import { InputDirective } from "./input/input.directive"
import { CarouselDirective } from "./carousel/carousel.directive"
import { FormsModule } from '@angular/forms';

const exports = [
  PracticeDirectiveHomeComponent,
  ValidationBorderDirective,
  UnlessDirective,
  HasRoleDirective,
  RangeDirective,
  ValidationBorderDirective,
  UnlessDirective,
  HasRoleDirective,
  RangeDirective,
  ClickOutsideDirective,
  ButtonDirective,
  TogglerDirective,
  PaddedValueDirective,
  InputDirective,
  CarouselDirective,
]
@NgModule({
  declarations: [...exports],
  exports: [...exports],
  imports: [
    CommonModule,
    PracticeDirectivesRoutingModule,
    PracticeComponentsModule,
    FormsModule,
  ],
})
export class PracticeDirectivesModule {}
