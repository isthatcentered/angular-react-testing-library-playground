import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core"
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms"
import log from "@isthatcentered/log"
import { Subject } from "rxjs"
import { takeUntil, tap } from "rxjs/operators"

// At which level do validations occur
// How can i trigger validations for everything
//

@Directive({
  selector: "[tableCellControlWatcher]",
})
export class CellWatcherDirective implements OnInit, OnDestroy {
  @Input()
  tableCellControlWatcher!: AbstractControl

  @HostListener("click")
  onClick() {
    const onClickOutside = (e: MouseEvent) => {
      if (this._el.nativeElement.contains(e.target as HTMLElement)) return
      this.state$.next("idle")
      window.removeEventListener("click", onClickOutside)
    }
    window.addEventListener("click", onClickOutside)
    this.state$.next("editing")
  }

  @HostListener("focusout")
  onfocusout() {
    this.state$.next("idle")
  }

  private startedEnabled!: boolean

  private state$: Subject<"editing" | "idle"> = new Subject()

  private destroy$: Subject<void> = new Subject<void>()

  constructor(
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.startedEnabled = this.tableCellControlWatcher.enabled

    this.state$
      .pipe(
        tap(state => {
          // log("state")(state)
          switch (state) {
            case "editing":
              this.tableCellControlWatcher.enable()
              return
            case "idle":
              const aChangeHasBeenMadeOrWasEnabledAnyway =
                this.tableCellControlWatcher.dirty || this.startedEnabled
              if (aChangeHasBeenMadeOrWasEnabledAnyway) return
              this.tableCellControlWatcher.disable()
              return
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }
}

@Component({
  selector: "app-validations",
  template: `
    <div class="pt-4"></div>
    <showcase name="Matching emails validation">
      <validations-matching-emails-validation></validations-matching-emails-validation>
    </showcase>

    <table class="mb-4">
      <tr *ngFor="let field of fields">
        <th class="p-2 border border-gray-200 bg-gray-100" scope="row">
          {{ field }}
        </th>
        <ng-container *ngFor="let item of tableArray.controls">
          <td
            [tableCellControlWatcher]="control"
            class="p-2 border border-gray-200"
            *ngIf="item.get(field) as control"
          >
            <input type="text" [formControl]="control" />
            <pre class="text-xs" *ngIf="control.errors">{{
              control.errors | json
            }}</pre>
          </td>
        </ng-container>
      </tr>
      <tr>
        <th class="p-2 border border-gray-200 bg-gray-100">GStatus</th>
        <td
          class="p-2 border border-gray-200"
          *ngFor="let group of tableArray.controls"
        >
          {{ group.status | json }}
        </td>
      </tr>
      <tr>
        <th class="p-2 border border-gray-200 bg-gray-100">GErrors</th>
        <td
          class="p-2 border border-gray-200"
          *ngFor="let group of tableArray.controls"
        >
          <pre class="text-xs"> {{ group.errors | json }}</pre>
        </td>
      </tr>
    </table>

    <button
      class="mb-4"
      appButton
      (click)="tableArray.updateValueAndValidity()"
    >
      Update
    </button>

    <button class="mb-4" appButton (click)="tableArray.at(0)?.disable()">
      Disable 1
    </button>
    <button class="mb-4" appButton (click)="tableArray.at(1)?.disable()">
      Disable 2
    </button>
    <button class="mb-4" appButton (click)="tableArray.at(2)?.disable()">
      Disable 3
    </button>
    <button class="mb-4" appButton (click)="tableArray.disable()">
      Disable array
    </button>
    <examples-form-debug [form]="form"></examples-form-debug>
  `,
  styles: [],
})
export class ValidationsComponent implements OnInit {
  log = log

  form: FormGroup = new FormGroup({
    array: new FormArray([
      this.makeGroup({
        hello: "John",
        greeting: "What's up?",
      }),
      this.makeGroup({
        hello: "Martha",
        greeting: "U gud ?",
      }),
      this.makeGroup({
        hello: "",
        greeting: "",
      }),
    ]),
  })

  get tableArray() {
    return this.form.get("array") as FormArray
  }

  fields: string[] = Object.keys((this.tableArray.at(0)! as FormGroup).controls)

  constructor() {}

  makeGroup(defaults: { hello: string; greeting: string }) {
    const group = new FormGroup({
      hello: new FormControl(defaults.hello || ""),
      greeting: new FormControl(defaults.greeting || "", Validators.required),
    })

    group.disable()

    return group
  }
  ngOnInit() {}
}
