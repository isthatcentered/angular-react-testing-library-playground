import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PaddedValueDirective } from "./padded-value.directive"
import { TogglerDirective } from './toggler.directive';
import { ButtonDirective } from './button.directive';

const declarations = [PaddedValueDirective, TogglerDirective]

@NgModule({
  declarations: [...declarations, ButtonDirective],
  exports: [ ...declarations, ButtonDirective ],
  imports: [CommonModule],
})
export class DirectivesModule {}
