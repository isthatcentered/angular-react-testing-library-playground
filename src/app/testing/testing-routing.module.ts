import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsHomeComponent } from './events/event-home/events-home.component';




const routes: Routes = [{ path: "", component: EventsHomeComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingRoutingModule {}
