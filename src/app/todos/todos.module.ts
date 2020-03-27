import { Component, Injectable, NgModule, OnInit } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { Title } from "@angular/platform-browser"
import { CommonModule } from "@angular/common"
import { EMPTY, Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { catchError, tap } from "rxjs/operators"
import log from "@isthatcentered/log"
import { ExamplesModule } from "../examples/examples.modules"

type Todo = { label: string; completed: boolean }

const always = <T>(thing: T) => () => thing

@Injectable({
  providedIn: "root",
})
class TodosService {
  todos$: Observable<Todo[]> = this._getTodos()

  constructor(private _http: HttpClient) {}

  private _getTodos() {
    return this._http
      .get<Todo[]>("/api/todos")
      .pipe(tap(log("data")), catchError(always(EMPTY)))
  }
}

@Component({
  selector: "app-todos-list",
  template: `
    <showcase name="Render prop toggle">
      <render-prop-toggle [on]="true" (onToggle)="handleToggle($event)">
        <ng-template let-on="on" let-toggle="toggle">
          <div class="pb-2">{{ on ? "😍" : "🤯" }}</div>
          <button
            class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            (click)="toggle()"
          >
            Toggle
          </button>
        </ng-template>
      </render-prop-toggle>
    </showcase>

    <showcase name="Compound toggle">
      <div compound-toggle (onToggle)="handleToggle($event)">
        <compound-toggle-button></compound-toggle-button>
        <compound-toggle-on>😍</compound-toggle-on>
        <compound-toggle-off>😵</compound-toggle-off>
      </div>
    </showcase>

    <showcase name="Padded Value">
      <label class="block">
        <span class="block mb-2">Padded Value</span>
        <input
          placeholder="01234"
          class="block w-full px-3 py-2 rounded border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 shadow-sm"
          [appPaddNumber]="5"
          type="text"
        />
      </label>
    </showcase>

    <h1 class="mt-8">My todo list</h1>
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <label>
          <input type="checkbox" [checked]="todo.completed" />
          {{ todo.label }}
        </label>
      </li>
    </ul>
  `,
})
export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]> = this._todos.todos$

  constructor(private _title: Title, private _todos: TodosService) {}

  ngOnInit(): void {
    this._title.setTitle("Todos")
  }

  handleToggle($event: boolean) {
    log("Event")($event)
  }
}

const routes: Routes = [
  {
    path: "",
    component: TodosListComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class TodosRoutingModule {}

@NgModule({
  declarations: [TodosListComponent],
  imports: [TodosRoutingModule, CommonModule, ExamplesModule],
  providers: [],
  exports: [TodosRoutingModule],
})
export class TodosModule {}
