import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { ValidationsRoutingModule } from "./validations-routing.module"
import {
  CellWatcherDirective,
  ValidationsComponent,
} from "./validations.component"
import { ExamplesModule } from "../examples/examples.module"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [CellWatcherDirective, ValidationsComponent],
  imports: [
    CommonModule,
    ValidationsRoutingModule,
    ExamplesModule,
    ReactiveFormsModule,
  ],
})
export class ValidationsModule {}
