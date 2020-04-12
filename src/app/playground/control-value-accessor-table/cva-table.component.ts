import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from "@angular/core"
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from "@angular/forms"
import { IO } from "fp-ts/lib/IO"
import { ControlType } from "@ng-stack/forms/lib/types"
import { FormArray, FormControl } from "@ng-stack/forms"
import { ReplaySubject } from "rxjs"
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from "rxjs/operators"
import { doTimes, withLog } from "../../helpers"
import { TypedChanges } from '../../types';

@Component({
  selector: "cva-table2",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CVATableComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CVATableComponent),
      multi: true,
    },
  ],
  template: `
    <table class="text-left">
      <tbody>
        <tr *ngFor="let col of columns; let rowIndex = index">
          <th class="p-2 h-8 border border-gray-200 capitalize" scope="row">
            {{ col.label }}
          </th>
          <td
            class="border border-gray-200 "
            *ngFor="let formGroup of _form.controls; let colIndex = index"
          >
            <input
              class="h-8  px-2"
              [formControl]="formGroup.get(col.id)"
              type="text"
            />
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class CVATableComponent<T extends object>
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  disabled: boolean = false
  onChange: ((newValue: T[]) => void) | undefined
  onTouched: IO<void> | undefined

  @Input()
  numberOfCols: number = 15

  @Input()
  makeItem!: () => ControlType<T>

  @Input()
  columns: { id: string; label: string }[] = []

  _form: FormArray<T> = new FormArray<T>([])
  _destroy$ = new ReplaySubject<void>()

  validate(_control: FormControl) {
    return null
  }

  ngOnInit(): void {
    this._form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        // tap(log("value_change")),
        tap(value => {
          this.onChange && this.onChange(value)
        }),
        takeUntil(this._destroy$),
      )
      .subscribe()
  }

  registerOnChange(fn: IO<void>): void {
    this.onChange = withLog("onChange")(fn)
  }

  registerOnTouched(fn: IO<void>): void {
    this.onTouched = fn
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
  }

  writeValue(value: T[] | null): void {
    this._form.clear()
    doTimes(this.numberOfCols, this.makeItem).forEach(
      this._form.push.bind(this._form),
    )

    this._form.patchValue(value || [])

    console.log("writeValue", value)
  }

  ngOnDestroy(): void {
    this._destroy$.next()
  }

  ngOnChanges(_changes: TypedChanges<CVATableComponent<T>>): void {
    if (_changes.makeItem && !_changes.makeItem.isFirstChange()) {
      this._form.clear()
      doTimes(this.numberOfCols, _changes.makeItem.currentValue).forEach(
        this._form.push.bind(this._form),
      )
    }
  }
}
