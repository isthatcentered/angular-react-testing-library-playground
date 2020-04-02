import { Component, Injectable, NgModule, OnInit } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { Title } from "@angular/platform-browser"
import { CommonModule } from "@angular/common"
import { EMPTY, Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { catchError, tap } from "rxjs/operators"
import log from "@isthatcentered/log"
import { ExamplesModule } from "../examples/examples.module"
import { FormControl, FormGroup, Validators } from "@angular/forms"

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
    <showcase name="Table">
      <examples-table
        [config]="{
          headers: ['book', 'author'],
          items: [
            { book: 'Im Batman', author: 'Bruce Wayne' },
            { book: 'Smores are the shit', author: 'John Rambo' }
          ]
        }"
      >
        <ng-template let-item let-row="row">{{ item[row] }} {{ row}}</ng-template>
      </examples-table>
    </showcase>

    <showcase name="Nested Tabs">
      <div tabs class="tabs">
        <nav tabControls="Entertainment" class="flex">
          <button
            class="p-4 "
            activeClasses="font-bold text-purple-700"
            tabControl="1"
          >
            Tab 1
          </button>
          <button
            class="p-4 mr-4"
            tabControl="2"
            activeClasses="font-bold text-purple-700"
          >
            Tab 2
          </button>
        </nav>
        <div class="px-4" tabPanel="1">
          <div tabs class="tabs">
            <nav tabControls="Entertainment" class="">
              <button
                class="p-4"
                activeClasses="text-purple-700"
                tabControl="1"
              >
                Sub 1
              </button>
              <button
                class="p-4"
                tabControl="2"
                activeClasses="text-purple-700"
              >
                Sub 2
              </button>
            </nav>
            <div class="p-4" tabPanel="1">Sub 1 panel</div>
            <div class="p-4" tabPanel="2">Sub 2 panel</div>
          </div>
        </div>
        <div class="p-4" tabPanel="2"></div>
      </div>
    </showcase>

    <showcase name="Tabs">
      <div tabs class="tabs">
        <nav tabControls="Entertainment" class="flex mb-4">
          <button
            activeClasses="text-gray-700 bg-gray-100 focus:bg-gray-200"
            inactiveClasses="text-gray-500 hover:text-gray-700 focus:bg-gray-100"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none "
            tabControl="nils"
          >
            Nils Frahm
          </button>
          <button
            tabControl="agnes"
            activeClasses="text-gray-700 bg-gray-100 focus:bg-gray-200"
            inactiveClasses="text-gray-500 hover:text-gray-700 focus:bg-gray-100"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none "
          >
            Agnes Obel
          </button>
          <button
            tabControl="complex"
            activeClasses="text-gray-700 bg-gray-100 focus:bg-gray-200"
            inactiveClasses="text-gray-500 hover:text-gray-700 focus:bg-gray-100"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none "
          >
            Joke
          </button>
        </nav>
        <div tabPanel="nils">
          <p>
            Nils Frahm is a German musician, composer and record producer based
            in Berlin. He is known for combining classical and electronic music
            and for an unconventional approach to the piano in which he mixes a
            grand piano, upright piano, Roland Juno-60, Rhodes piano, drum
            machine, and Moog Taurus.
          </p>
        </div>
        <div tabPanel="agnes">
          <p>
            Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first
            album, Philharmonics, was released by PIAS Recordings on 4 October
            2010 in Europe. Philharmonics was certified gold in June 2011 by the
            Belgian Entertainment Association (BEA) for sales of 10,000 Copies.
          </p>
        </div>
        <div tabPanel="complex">
          <p>
            Fear of complicated buildings:
          </p>
          <p>
            A complex complex complex.
          </p>
        </div>
      </div>
    </showcase>

    <showcase name="Toggler directive">
      <ng-template #hint
        >Check the
        <code>DOM</code>
        for
        <code>role</code>
        and
        <code>aria-checked</code>
        attribute</ng-template
      >

      <button class="mb-4" role="waffle" appButton toggler [on]="true">
        Custom role
      </button>
      <br />
      <button class="mb-4" appButton toggler [on]="true">
        on = true
      </button>
      <br />
      <button appButton toggler [on]="false">on = false</button>
    </showcase>

    <showcase name="Render prop toggle">
      <render-prop-toggle [on]="true" (onToggle)="handleToggle($event)">
        <ng-template let-on="on" let-toggle="toggle">
          <div class="pb-2">{{ on ? "😍" : "🤯" }}</div>
          <button appButton (click)="toggle()">
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
