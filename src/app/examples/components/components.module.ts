import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TabsModule } from "./tabs/tabs.module"

const modules = [TabsModule]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class ComponentsModule {}
