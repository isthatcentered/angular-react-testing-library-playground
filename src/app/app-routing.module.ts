import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "validations",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./validations/validations.module").then(
            m => m.ValidationsModule,
          ),
      },
    ],
  },
  {
    path: "playground",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./playground/playground.module").then(
            m => m.PlaygroundModule,
          ),
      },
    ],
  },
  {
    path: "practice-components",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./practice-components/practice-components.module").then(
            m => m.PracticeComponentsModule,
          ),
      },
    ],
  },
  {
    path: "practice-directives",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./practice-directives/practice-directives.module").then(
            m => m.PracticeDirectivesModule,
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
