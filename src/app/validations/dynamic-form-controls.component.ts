import { Component, Injectable, OnDestroy, OnInit } from "@angular/core"
import { merge, Observable, of, Subject } from "rxjs"
import {
  delay,
  shareReplay,
  takeUntil,
  tap,
  withLatestFrom,
} from "rxjs/operators"
import { FormArray, FormBuilder, FormControl, FormGroup } from "@ng-stack/forms"
import * as R from "ramda"
import { flow } from "fp-ts/lib/function"
import * as Arr from "fp-ts/lib/Array"

type Order = {
  id: number
  name: string
}

@Injectable({
  providedIn: "root",
})
class OrdersService {
  list(): Observable<Order[]> {
    return of([
      {
        id: 1,
        name: "Waffles for me",
      },
      {
        id: 2,
        name: "Pancakes for me also",
      },
      {
        id: 3,
        name: "Dried raisins, definitly not for me",
      },
      {
        id: 4,
        name: "Kanye west",
      },
    ]).pipe(delay(1000))
  }
}

@Injectable({
  providedIn: "root",
})
class ExtrasService {
  extras$: Observable<string[]> = of([
    "peanut",
    "waffles",
    "pancakes",
    "kanye",
  ]).pipe(shareReplay())
}

type FormModel = { selectedOrder: string; extras: boolean[] }

@Component({
  selector: "validations-dynamic-form-controls",
  template: `
    <form [formGroup]="form" *ngIf="orders$ | async as extras; else loading">
      <label>
        Orders select
        <select
          *ngIf="orders$ | async as orders; else loading"
          [formControl]="form.get('selectedOrder')"
        >
          <option *ngFor="let order of orders" [value]="order.id.toString()">{{
            order.name
          }}</option>
        </select>
      </label>

      <fieldset class="m-4">
        <legend>Orders radio</legend>
        <label class="mr-4 inline-block" *ngFor="let order of extras">
          <input
            [value]="order.id.toString()"
            type="radio"
            [formControl]="form.get('selectedOrder')"
          />
          {{ order.name }}
        </label>
      </fieldset>

      <fieldset class="mb-4" *ngIf="extras$ | async as extras">
        <legend>Extras</legend>
        <label
          class="mr-4 inline-block"
          formArrayName="extras"
          *ngFor="let extra of form.get('extras')?.controls; let index = index"
        >
          <input
            aria-describedby="extras-errors"
            type="checkbox"
            [formControlName]="index"
          />
          {{ extras[index] }}
        </label>
        <p id="extras-errors" class="mt-2" aria-live="polite">
          <span
            class=" text-red-600"
            *ngIf="form.get('extras')?.errors?.required"
          >
            At least one extra must be selected. Now that's business for you 😌
          </span>
        </p>
      </fieldset>
      <button appButton type="submit" (click)="clickedSubmit$.next()">
        Submit
      </button>
    </form>

    <!--    <examples-form-debug [form]="form"></examples-form-debug>-->

    <ng-template #loading>Loading... 🍕</ng-template>
  `,
})
export class DynamicFormControlsComponent implements OnInit, OnDestroy {
  // actions
  clickedSubmit$ = new Subject<void>()
  destroyed$ = new Subject<void>()

  // State observables
  orders$!: Observable<Order[] | undefined>

  extras$!: Observable<string[] | undefined>
  form!: FormGroup<FormModel>

  constructor(
    private _builder: FormBuilder,
    private _ordersService: OrdersService,
    private _extrasService: ExtrasService,
  ) {}

  ngOnInit(): void {
    this.form = this._builder.group<{
      selectedOrder: string
      extras: boolean[]
    }>({
      selectedOrder: ["0"],
      extras: new FormArray(
        [],
        [
          control => {
            const array = <FormArray<boolean>>control
            return !array.value.find(value => value === true)
              ? { required: true }
              : null
          },
        ],
      ),
    })

    this.orders$ = this._ordersService
      .list()
      .pipe(
        tap(orders =>
          this.form.get("selectedOrder")?.patchValue(orders[2]?.id.toString()),
        ),
      )

    this.extras$ = this._extrasService.extras$

    // Side effects
    merge(
      this.extras$.pipe(
        tap(extras => {
          extras?.forEach(() =>
            this.form.get("extras")?.push(new FormControl(false)),
          )
        }),
      ),
      this.clickedSubmit$.pipe(
        withLatestFrom(this.extras$),
        tap(([_, extras]) => {
          console.log(this._cleanupSubmission(extras!))
        }),
      ),
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe()
  }

  private _cleanupSubmission(extras: string[]) {
    return R.evolve(
      {
        extras: flow(
          Arr.filter(Boolean),
          Arr.mapWithIndex((index, selected) =>
            selected ? extras![index] : false,
          ),
        ),
      },
      this.form.value,
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
  }
}
