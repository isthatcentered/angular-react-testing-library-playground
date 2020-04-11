import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { PlaygroundRoutingModule } from "./playground-routing.module"
import { PlaygroundHomeComponent } from "./playground-home/playground-home.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { DynamicTableControlModule } from "./dynamic-table-controls/dynamic-table-control.module";
import { NumberPipe } from './number.pipe'

@NgModule({
  declarations: [PlaygroundHomeComponent, NumberPipe],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicTableControlModule,
  ],
})
export class PlaygroundModule {}
