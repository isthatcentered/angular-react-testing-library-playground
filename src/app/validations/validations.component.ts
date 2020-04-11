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
import { AbstractControl, Validators } from "@angular/forms"
import log from "@isthatcentered/log"
import { Subject } from "rxjs"
import { takeUntil, tap } from "rxjs/operators"
import { FormArray, FormControl, FormGroup } from "@ng-stack/forms"

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
    <showcase name="Auto control error">
      <label class="block mb-4">
        <span>Firstname</span>
        <input
          aria-describedby="firstname-errors"
          appInput
          [formControl]="form2.get('firstname')"
          type="text"
        />
        <span aria-live="polite" id="firstname-errors" class="block">
          <shared-control-errors [control]="form2.get('firstname')">
            <ng-template let-error>
              <span>{{ error }}</span>
            </ng-template>
          </shared-control-errors>
          <span
            class="my-4 block"
            *ngIf="
              form.get('firstname')?.touched &&
              form.get('firstname')?.errors?.required
            "
            >Don't ignore me! 😳</span
          >
        </span>
      </label>
    </showcase>
    <showcase name="Control value accessor component">
      <validations-control-value-accessor-form-components></validations-control-value-accessor-form-components>
    </showcase>
    <showcase name="Forms with async validation">
      <validations-async-form-validation></validations-async-form-validation>
    </showcase>
    <showcase name="Validations dynamic form controls">
      <validations-dynamic-form-controls></validations-dynamic-form-controls>
    </showcase>
    <showcase name="Form with async data">
      <validations-form-with-async-data></validations-form-with-async-data>
    </showcase>
    <showcase name="Matching emails validation">
      <validations-matching-emails-validation></validations-matching-emails-validation>
    </showcase>
  `,
  styles: [],
})
export class ValidationsComponent implements OnInit {
  log = log
  form2: FormGroup<{ firstname: string }> = new FormGroup({
    firstname: new FormControl("blah", [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
    ]),
  })
  form: FormGroup = new FormGroup<{
    array: { hello: string; greeting: string }[]
  }>({
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
