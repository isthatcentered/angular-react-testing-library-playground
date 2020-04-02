import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TabsModule } from "./tabs/tabs.module";
import { FormDebugComponent } from './form-debug/form-debug.component'
import { TableModule } from './table.module';

const modules = [TabsModule, TableModule]

@NgModule({
  declarations: [FormDebugComponent],
  imports: [CommonModule, ...modules],
  exports: [ ...modules, FormDebugComponent ],
})
export class ComponentsModule {}
