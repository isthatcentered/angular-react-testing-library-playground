import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundHomeComponent } from './playground-home/playground-home.component';


const routes: Routes = [
  {
    path: "",
    component: PlaygroundHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
