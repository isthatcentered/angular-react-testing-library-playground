import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <main class="p-4 max-w-2xl mx-auto">
      <app-signup></app-signup>
    </main>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "reactive-forms";
}
