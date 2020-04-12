import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-playground-home",
  template: `
    <h1 class="mt-8 mb-4 text-lg font-bold">Playground-home</h1>
    <ul class="mb-4">
      <li>
        <a
          *ngFor="let item of navitems"
          class="capitalize mr-4 text-gray-600 underline"
          [routerLink]="item"
          routerLinkActive="text-indigo-600"
        >
          {{ item }}
        </a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class PlaygroundHomeComponent implements OnInit {
  navitems: string[] = [
    "dynamic-table-controls",
    "control-value-accessor-table",
  ]
  constructor() {}

  ngOnInit() {}
}
