import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core"

type CollectionLens<T> = {
  current: T
  index: number
  next: () => void
  prev: () => void
}

class ArrayLens<T> implements CollectionLens<T> {
  private _index: number = 0

  current: T

  set index(index: number) {
    this._index = index
    this.current = this.items[index]
  }

  get index() {
    return this._index
  }

  constructor(private items: T[]) {
    this.current = items[this.index]
  }

  next() {
    this.index = this.index + 1
    if (this.index >= this.items.length) {
      this.index = 0
    }
  }

  prev() {
    this.index = this.index - 1

    if (this.index < 0) {
      this.index = this.items.length - 1
    }
  }
}

class CarouselContext<T> {
  private readonly lens: CollectionLens<T>

  constructor(private _items: T[]) {
    this.lens = new ArrayLens(_items)
  }

  get $implicit() {
    return this.lens.current
  }

  get index() {
    return this.lens.index
  }

  get controller() {
    return {
      prev: this.lens.prev.bind(this.lens),
      next: this.lens.next.bind(this.lens),
    }
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
    autoplay ? this.setAutoplayTimer() : this.clearAutoplayTimer()
  }

  @Input("carouselWithDelay")
  delay: number = 2000

  private context!: CarouselContext<T>

  timerId: number | null = null

  constructor(
    private _tpl: TemplateRef<CarouselContext<T>>,
    private _view: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.context = new CarouselContext(this.items)
    this._view.createEmbeddedView(this._tpl, this.context)
  }

  ngOnDestroy() {
    this.clearAutoplayTimer()
  }

  private clearAutoplayTimer() {
    window.clearInterval(this.timerId!)
  }

  private setAutoplayTimer() {
    this.timerId = window.setInterval(
      () => this.context.controller.next(),
      this.delay,
    )
  }
}
