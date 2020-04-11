import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  DynamicTableComponent,
  DynamicTableControlsComponent,
} from "./dynamic-table-controls.component"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [DynamicTableControlsComponent, DynamicTableComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicTableControlModule {}
