import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundHomeComponent } from './playground-home/playground-home.component';
import { DynamicTableControlsComponent } from './dynamic-table-controls/dynamic-table-controls.component';




const routes: Routes = [
  {
    path: "",
    component: PlaygroundHomeComponent,
    children: [
      {
        path: "dynamic-table-controls",
        component:DynamicTableControlsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
