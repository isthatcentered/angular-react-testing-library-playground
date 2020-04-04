import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




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
    path: "testing",
    children: [
      {
        path: "",
        loadChildren: () =>
                import("./testing/testing.module").then(m => m.TestingModule),
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
