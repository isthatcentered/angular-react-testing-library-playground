import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PlaygroundHomeComponent } from "./playground-home/playground-home.component"
import { DynamicTableControlsComponent } from "./dynamic-table-controls/dynamic-table-controls.component"
import { ControlValueAccessorTableComponent } from "./control-value-accessor-table/control-value-accessor-table.module"

const routes: Routes = [
  {
    path: "",
    component: PlaygroundHomeComponent,
    children: [
      {
        path: "dynamic-table-controls",
        component: DynamicTableControlsComponent,
      },
      {
        path: "control-value-accessor-table",
        component: ControlValueAccessorTableComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaygroundRoutingModule {}
