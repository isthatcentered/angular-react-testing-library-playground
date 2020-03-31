import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <main class="p-4 max-w-2xl mx-auto">
      <nav>
        <a class="mr-4 text-blue-600 underline" routerLink="/todos">Todos</a>
        <a class="mr-4 text-blue-600 underline" routerLink="/validations"
          >Validations</a
        >
      </nav>
      <!--      <app-signup></app-signup>-->
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "reactive-forms"
}
