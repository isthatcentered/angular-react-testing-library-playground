import {
  Component,
  forwardRef,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
} from "@angular/core"
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms"
import { IO } from "fp-ts/lib/IO"
import { FormControl, FormGroup, Validators } from "@ng-stack/forms"
import { doTimes, Log, withLog } from "../../helpers"
import { CommonModule } from "@angular/common"
import { PracticeDirectivesModule } from "../../practice-directives/practice-directives.module"
import { ReplaySubject } from "rxjs"
import { debounceTime, startWith, takeUntil, tap } from "rxjs/operators"
import { ControlType } from "@ng-stack/forms/lib/types"
import log from "@isthatcentered/log"
import { CVATableComponent } from "./cva-table.component"

interface User {
  name: string
  job: string
  hobbies: string
  devise: string
}
const makeUser = (overrides: Partial<User>): User => ({
  hobbies: "hobbies",
  job: "job",
  name: "name",
  devise: "",
  ...overrides,
})

@Component({
  selector: "cva-multi-table",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiTableComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiTableComponent),
      multi: true,
    },
  ],
  template: `
    <select class="mb-4" [formControl]="_selectedOption">
      <option *ngFor="let option of options | keyvalue" [value]="option.key">
        {{ option.key }} {{ option.value }}
      </option>
    </select>

    <cva-table2
      [columns]="columns"
      [makeItem]="makeItem"
      [formControl]="_tableControl"
    ></cva-table2>
  `,
})
export class MultiTableComponent<T>
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  makeItem!: () => ControlType<T>

  @Input()
  columns: { id: string; label: string }[] = []

  @Input()
  options!: Record<string, string>

  disabled: boolean = false
  onChange: (newValue: T[]) => void = () => undefined
  onTouched: IO<void> = () => undefined

  _tableControl = new FormControl<T[]>([])

  _value!: T[]
  _destroy$ = new ReplaySubject<void>()
  _selectedOption!: FormControl<string>

  set value(value: T[] | undefined) {
    if (value && value === this._value) return

    this._value = value || []
    this.onChange(this._value)
    this.onTouched()
    log("value")(this._value)
  }

  validate(c: FormControl) {
    c
    // should return false if a group is dirty and invalid ?
    return null
  }

  ngOnInit(): void {
    this._value = []
    this._selectedOption = new FormControl<string>(Object.keys(this.options)[0])

    this._selectedOption.valueChanges
      .pipe(
        startWith(this._selectedOption.value),
        debounceTime(500),
        tap(log("selected")),
        tap(selectedOption => {
          const itemsMatchingOption = this._value.filter(
            i => (i as any).devise === selectedOption,
          )
          console.log(selectedOption)
          log("matching")(itemsMatchingOption)

          // give me

          this._tableControl.patchValue(itemsMatchingOption)
        }),
        takeUntil(this._destroy$),
      )
      .subscribe()
    // this._form = new FormArray<T>( doTimes( 15, this.makeItem ) )
    //
    // this._form.valueChanges
    //   .pipe(
    //     distinctUntilChanged(),
    //     debounceTime( 500 ),
    //     tap( () => {
    //       let onlyDirtyFieldsValue = this._form.controls
    //         .filter( c => c.dirty )
    //         .map( c => c.value )
    //       this.onChange( onlyDirtyFieldsValue )
    //       this.onTouched()
    //     } ),
    //     takeUntil( this._destroy$ ),
    //   )
    //   .subscribe()
  }

  registerOnChange(fn: IO<void>): void {
    this.onChange = withLog("onChangeMultiTable")(fn)
  }

  registerOnTouched(fn: IO<void>): void {
    this.onTouched = fn
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
  }

  @Log
  writeValue(value: any): void {
    this.value = value
  }

  ngOnDestroy(): void {
    this._destroy$.next()
  }
}

@Component({
  selector: "app-control-value-accessor-table",
  template: `
    <cva-multi-table
      [columns]="columns"
      [makeItem]="_makeItem"
      [formControl]="control"
      [options]="options"
    >
    </cva-multi-table>
    <!--    <cva-table-->
    <!--    ></cva-table>-->
    <pre class="text-xs">{{ control.valid | json }}</pre>
    <pre class="text-xs">{{ control.errors | json }}</pre>
    <pre class="text-xs">{{ control.value | json }}</pre>
  `,
  styles: [],
})
export class ControlValueAccessorTableComponent implements OnInit {
  control = new FormControl<User[]>(this._getDefaultValues())
  columns = [
    { id: "name", label: "Name" },
    { id: "job", label: "Job" },
    { id: "hobbies", label: "Hobbies" },
  ]
  options = {
    "250": "Franc Français",
    "276": "Deutschmark",
    "380": "Euro",
    "400": "Dollar",
  }

  constructor() {}

  ngOnInit() {}

  private _getDefaultValues(): User[] {
    return [
      ...doTimes(2, makeUser.bind(null, { devise: "250" })),
      ...doTimes(4, makeUser.bind(null, { devise: "380" })),
    ]
  }

  _makeItem(): ControlType<User> {
    return new FormGroup<User>({
      hobbies: new FormControl(""),
      job: new FormControl(""),
      name: new FormControl("", Validators.required),
      devise: new FormControl(""),
    })
  }
}

@NgModule({
  declarations: [
    ControlValueAccessorTableComponent,
    MultiTableComponent,
    CVATableComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, PracticeDirectivesModule],
  providers: [],
  exports: [ControlValueAccessorTableComponent],
})
export class ControlValueAccessorTableModule {}
