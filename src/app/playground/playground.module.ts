import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { PlaygroundRoutingModule } from "./playground-routing.module"
import { PlaygroundHomeComponent } from "./playground-home/playground-home.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { DynamicTableControlModule } from "./dynamic-table-controls/dynamic-table-control.module"
import { NumberPipe } from "./number.pipe"
import { ControlValueAccessorTableModule } from "./control-value-accessor-table/control-value-accessor-table.module"

@NgModule({
  declarations: [PlaygroundHomeComponent, NumberPipe],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicTableControlModule,
    ControlValueAccessorTableModule,
  ],
})
export class PlaygroundModule {}
