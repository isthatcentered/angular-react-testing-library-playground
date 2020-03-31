import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

const routes: Routes = [
  {
    path: "todos",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./todos/todos.module").then(m => m.TodosModule),
      },
    ],
  },
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
