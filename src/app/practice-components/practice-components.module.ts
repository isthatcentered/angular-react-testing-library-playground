import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { PracticeComponentsRoutingModule } from "./practice-components-routing.module"
import { PracticeComponentsHomeComponent } from "./practice-components-home.component"
import { CompoundToggleModule } from "./compound-toggle/compound-toggle.module"
import { RenderPropToggleModule } from "./render-prop-toggle/render-prop-toggle.module"
import { TabsModule } from "./tabs/tabs.module"
import { FormDebugModule } from "./form-debug/form-debug.module"
import { ControlErrorsModule } from "./control-errors/control-error.module"
import { ShowcaseModule } from "./showcase/showcase.module"

const declarations = [
  CompoundToggleModule,
  RenderPropToggleModule,
  TabsModule,
  FormDebugModule,
  ControlErrorsModule,
  CommonModule,
  PracticeComponentsRoutingModule,
  ShowcaseModule,
]
@NgModule({
  declarations: [PracticeComponentsHomeComponent],
  imports: [CommonModule, ...declarations],
  exports: [...declarations],
})
export class PracticeComponentsModule {}
