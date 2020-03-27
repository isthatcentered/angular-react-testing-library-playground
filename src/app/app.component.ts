import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <main class="p-4 max-w-2xl mx-auto">
      <a routerLink="/todos">Todos</a>
      <!--      <app-signup></app-signup>-->
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "reactive-forms"
}
