import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core"
import { Subject } from "rxjs"
import { debounceTime, takeUntil, tap } from "rxjs/operators"

@Directive({
  selector: "[appPaddNumber]",
})
export class PaddedValueDirective implements OnInit, OnDestroy {
  @Input()
  appPaddNumber!: number

  // https://angular.io/api/core/HostListener
  @HostListener("input", ["$event"])
  onInput(event: KeyboardEvent) {
    this._change$.next((event.target as HTMLInputElement).value)
  }

  private _destroy$: Subject<void> = new Subject()

  private _change$: Subject<string> = new Subject()

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    this._change$
      .pipe(
        debounceTime(500),
        tap(value =>
          this._renderer.setProperty(
            this._el.nativeElement,
            "value",
            value.padStart(this.appPaddNumber, "0"),
          ),
        ),
        takeUntil(this._destroy$),
      )
      .subscribe(console.log)
  }

  ngOnDestroy(): void {
    this._destroy$.next()
  }
}
