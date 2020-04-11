import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PracticeDirectiveHomeComponent } from "./practice-directive-home.component"

const routes: Routes = [
  {
    path: "",
    component: PracticeDirectiveHomeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeDirectivesRoutingModule {}
