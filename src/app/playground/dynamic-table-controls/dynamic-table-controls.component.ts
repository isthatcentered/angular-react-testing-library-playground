import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import { FormArray, FormControl, FormGroup, Validators } from "@ng-stack/forms"
import { flatten, keys, map as arrmap } from "ramda"
import { pipe } from "fp-ts/lib/pipeable"
import log from "@isthatcentered/log"
import { ReplaySubject } from "rxjs"
import { map, takeUntil } from "rxjs/operators"

const doTimes = <T>(times: number, action: (index: number) => T): T[] =>
  Array.from({ length: times }, (_, ind) => action(ind))

type FormModel = { codeDevise: string; infos: string }

const makeGroup = (devise: string): FormGroup<FormModel> =>
  new FormGroup<FormModel>({
    codeDevise: new FormControl(devise),
    infos: new FormControl("", Validators.required),
  })

@Component({
  selector: "playground-dynamic-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex" *ngIf="_copy">
      <div class="mr-2" *ngFor="let group of _copy.controls">
        <input
          class="block border border-gray-200 rounded px-2 mb-2"
          [formControl]="group.get('codeDevise')"
          type="text"
        />
        <input
          class="block border border-gray-200 rounded px-2"
          [formControl]="group.get('infos')"
          type="text"
        />
        {{ group.get("infos").errors | json }}
        {{ group.dirty | json }}
      </div>
    </div>
  `,
})
export class DynamicTableComponent implements OnInit, OnDestroy {
  @Input()
  form!: FormArray<FormModel>

  @Input()
  set devise(devise: string) {
    log("set")(this.form)
    // remove untouched and invalid existing controls
    const controlToKeep = [...this.form.controls].filter(
      control => control.dirty,
    )
    this.form.controls = controlToKeep

    this._devise = devise

    const existingControlsForDevise = controlToKeep.filter(
      control => control.get("codeDevise")!.value === devise,
    )

    // get me all existing group with that devise
    const missingControls = doTimes(15 - existingControlsForDevise.length, () =>
      makeGroup(devise),
    )

    missingControls.forEach(control => this.form.push(control))

    // fill in the missing to get to 15
    this._copy.controls = [...existingControlsForDevise, ...missingControls]

    // this._copy.updateValueAndValidity()
  }

  _devise!: string

  _copy: FormArray<FormModel> = new FormArray<FormModel>([])

  _destroy$ = new ReplaySubject<void>()

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next()
  }
}

@Component({
  selector: "playgroud-dynamic-table-controls",
  template: `
    <select class="mb-4" [formControl]="selectedDevise">
      <option
        *ngFor="let item of codesDevise | keyvalue"
        [value]="item.key | number"
      >
        {{ item.key }} {{ item.value }}
      </option>
    </select>

    <playground-dynamic-table
      [form]="parent"
      [devise]="selectedDevise.value"
    ></playground-dynamic-table>

    <pre class="text-xs">{{ parent.value.length | json }}</pre>
    <pre class="text-xs">{{ parent.value | json }}</pre>
  `,
  styles: [],
})
export class DynamicTableControlsComponent implements OnInit, OnDestroy {
  parent!: FormArray<FormModel>
  codesDevise = {
    "250": "Franc Français",
    "276": "Deutschmark",
    "380": "Euro",
    "400": "Dollar",
  }

  selectedDevise = new FormControl<string>("250")

  _destroy$ = new ReplaySubject<void>()

  ngOnInit() {
    this.getControls()
    this.parent = new FormArray<FormModel>(this.getControls())

    this.parent.valueChanges
      .pipe(
        map(() => {
          const dirtyControls = this.parent.controls.filter(c => c.dirty),
            validControls = dirtyControls.filter(c => c.valid)

          if (dirtyControls.length !== validControls.length) {
            this.selectedDevise.disable()
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
  }

  private getControls() {
    const makeControlsForDevise = (devise: string): FormGroup<FormModel>[] =>
      doTimes(0, () => makeGroup(devise))
    return pipe(keys(this.codesDevise), arrmap(makeControlsForDevise), flatten)
  }
}
