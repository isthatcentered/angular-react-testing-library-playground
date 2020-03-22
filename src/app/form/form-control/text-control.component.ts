import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core"
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms"
import { pipe } from "fp-ts/lib/pipeable"
import { map } from "fp-ts/lib/Array"

export type Maybe<T> = T | null | undefined

const always = <T>(val: T) => () => val

const defaultTo = <T>(defaultValue: T) => (actual: T) => actual || defaultValue

const keys = <T extends Record<any, any>>(record: T): Array<keyof T> =>
  Object.keys(record)

const toPairs = <K extends string | number, V>(
  record: Record<K, V>,
): Array<[K, V]> => keys(record).map(key => [key, record[key]])

type ValidatorsMessages = {
  minlength: {
    requiredLength: number
    actualLength: number
  }
  maxlength: {
    requiredLength: number
    actualLength: number
  }
  required: true
  email: true
  notamatch: true
}

@Directive({
  selector: "[app-label]",
})
export class LabelDirective implements OnInit {
  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    ;[
      "capitalize",
      "block",
      "text-sm",
      "font-medium",
      "leading-5",
      "text-gray-700",
    ].forEach(className =>
      this._renderer.addClass(this._el.nativeElement, className),
    )
  }
}

@Component({
  selector: "app-control-error",
  template: `
    <p
      id="{{ name }}-errors"
      *ngFor="let alert of alerts"
      class="mt-2 text-sm text-red-600"
    >
      {{ alert }}
    </p>
  `,
})
export class ControlErrorComponent {
  @Input()
  private control!: AbstractControl

  @Input()
  name!: string

  validationMessagesBank: {
    [K in keyof ValidatorsMessages]: (err: ValidatorsMessages[K]) => string
  } = {
    maxlength: ({ requiredLength }) =>
      `Can't be more than ${requiredLength} characters long`,
    minlength: ({ requiredLength }) =>
      `Must be at least ${requiredLength} characters long`,
    email: always("Not a valid email"),
    required: always("This field is required"),
    notamatch: always("Non matching fields"),
  }

  get alerts(): string[] {
    return this.errors
      ? pipe(
          this.errors,
          toPairs,
          map(([key, error]) => this.validationMessagesBank[key](error as any)),
        )
      : []
  }

  private get errors(): ValidatorsMessages {
    return (this.control.errors || {}) as ValidatorsMessages
  }
}

/**
 * @todos:
 * - Label defaults to labelized name if not provided -> Or passes something ot component/label irective applied
 * - Hides label if set to false && use plaeholder as value
 * - If label is hidden, use it as placeholder
 * - Passed error to error component
 */
@Component({
  selector: "app-text-control",
  template: `
    <label [formGroup]="group" [ngClass]="class" class="block">
      <span app-label [ngClass]="{ 'sr-only': hideLabel }">{{
        label === "false" || !label ? (name | labelize) : label
      }}</span>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          [attr.data-testid]="dataTestId"
          [ngClass]="{
            'placeholder-red-300 focus:border-red-300 focus:shadow-outline-red border-red-300 text-red-900': errors
          }"
          [type]="type"
          class="form-input block w-full pr-10 sm:text-sm sm:leading-5"
          [placeholder]="placeholder"
          [formControlName]="name"
        />
        <div
          *ngIf="!!group.get(name)!.errors"
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <app-control-error
        [name]="name"
        *ngIf="errors"
        [control]="control"
      ></app-control-error>
    </label>
  `,
  styles: [],
})
export class TextControlComponent implements OnInit {
  @Input()
  name!: string

  @Input()
  group!: FormGroup

  @Input()
  label: string | undefined | false

  @Input()
  placeholder: string | undefined

  @Input()
  class: string = ""

  @Input()
  type: string = "text"

  @Input()
  dataTestId: string | undefined

  constructor() {}

  ngOnInit(): void {}

  get hideLabel() {
    return this.label === false || this.label === "false"
  }

  get control(): Maybe<AbstractControl> {
    return this.group.get(this.name)
  }
  get errors(): Maybe<ValidationErrors> {
    return this.control?.errors
  }
}
