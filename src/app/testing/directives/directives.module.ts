import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ValidationBorderDirective } from "./validation-border/validation-border.directive"
import { UnlessDirective } from "./unless/unless.directive"
import { HasRoleDirective } from "./has-role/has-role.directive"

@NgModule({
  declarations: [ValidationBorderDirective, UnlessDirective, HasRoleDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
