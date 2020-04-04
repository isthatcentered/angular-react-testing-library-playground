import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingHomePageComponent } from './testing-home-page.component';




const routes: Routes = [{ path: "", component: TestingHomePageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingRoutingModule {}
