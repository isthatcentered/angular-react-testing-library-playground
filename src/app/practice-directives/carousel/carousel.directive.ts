import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core"
import Timeout = NodeJS.Timeout

type CarouselContext<T> = {
  $implicit: T
  index: number
  controller: { next: () => void; prev: () => void }
}

class CarouselContextBehavior<T> implements CarouselContext<T> {
  $implicit: T
  controller: { next: () => void; prev: () => void }
  index: number = 0

  constructor(private _items: T[]) {
    this.$implicit = _items[this.index]
    this.controller = {
      next: this._handleNext.bind(this),
      prev: this._handlePrev.bind(this),
    }
  }

  private _handlePrev() {
    this.index--
    if (this.index < 0) {
      this.index = this._items.length - 1
    }

    this._updateContext()
  }

  private _handleNext() {
    this.index++
    if (this.index >= this._items.length) {
      this.index = 0
    }

    this._updateContext()
  }

  _updateContext() {
    this.$implicit = this._items[this.index]
  }
}

class AutoplayBehavior {
  timerId: Timeout | undefined
  delay: number

  constructor(delay: number, private onTickAction: () => void) {
    this.delay = delay
  }

  start() {
    this.timerId = setInterval(this._onTick.bind(this), this.delay)
  }

  stop() {
    clearInterval(this.timerId!)
  }

  private _onTick() {
    this.onTickAction()
  }
}

// https://netbasal.com/understanding-angular-structural-directives-659acd0f67e
@Directive({
  selector: "[carousel]",
})
export class CarouselDirective<T> implements OnInit, OnDestroy {
  @Input("carouselOf")
  items!: T[]

  @Input("carouselAutoplay")
  set autoplay(autoplay: boolean) {
    autoplay ? this._autoplay.start() : this._autoplay.stop()
  }

  @Input("carouselWithDelay")
  delay: number = 2000

  private context!: CarouselContext<T>

  private _autoplay!: AutoplayBehavior

  constructor(
    private _tpl: TemplateRef<CarouselContext<T>>,
    private _view: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.context = new CarouselContextBehavior(this.items)
    this._view.createEmbeddedView(this._tpl, this.context)
    this._autoplay = new AutoplayBehavior(
      this.delay,
      this.context.controller.next,
    )
  }

  ngOnDestroy() {
    this._autoplay.stop()
  }
}
