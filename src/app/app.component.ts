import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <main class="p-4 max-w-2xl mx-auto">
      <nav>
        <ul class="flex items-center">
          <li *ngFor="let item of nav">
            <a
              class="capitalize mr-4 text-gray-600 underline"
              [routerLink]="item.path"
              routerLinkActive="text-indigo-600"
              >{{ item.label }}</a
            >
          </li>
        </ul>
      </nav>
      <!--      <app-signup></app-signup>-->
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  nav = [
    { path: "validations", label: "forms" },
    { path: "practice-components", label: "components" },
    { path: "practice-directives", label: "directives" },
    { path: "playground", label: "playground" },
  ]
}
