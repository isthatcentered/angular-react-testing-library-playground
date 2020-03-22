import { Component, NgModule } from "@angular/core"
import { ActivatedRoute, RouterModule } from "@angular/router"
import { RouterTestingModule } from "@angular/router/testing"
import { render } from "@testing-library/angular"

@Component({
  selector: "[app-app]",
  template: `
    <h1>app</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}

@Component({
  selector: "[app-home-page]",
  template: `
    <h1>home page</h1>
    <a routerLink="/blah">go to item</a>
  `,
})
export class HomePageComponent {}

@Component({
  selector: "[app-item-page]",
  template: `
    <h1>item page</h1>
            id param: {{param}}
  `,
})
export class ItemPageComponent {
  param: string
  constructor(private _route: ActivatedRoute) {
    this.param = this._route.snapshot.params["id"]
  }
}

test(`I see the homepage by default`, async () => {
  const app = await render(AppComponent, {
    declarations: [HomePageComponent, ItemPageComponent, AppComponent],
    routes: [
      {
        path: "",
        children: [
          {
            path: "",
            component: HomePageComponent,
          },
          {
            path: ":id",
            component: ItemPageComponent,
          },
        ],
      },
    ],
  })

  await app.navigate("") // necessary to trigger routing
  await app.navigate(app.getByText(/go to item/i))

  // blah is the :id we navigate to
  expect(() => app.getByText(/id param: blah/i)).not.toThrow()
})
