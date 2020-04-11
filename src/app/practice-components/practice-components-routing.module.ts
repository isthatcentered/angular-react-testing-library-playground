import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PracticeComponentsHomeComponent } from "./practice-components-home.component"

const routes: Routes = [
  { path: "", component: PracticeComponentsHomeComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeComponentsRoutingModule {}
