import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { Maybe } from "src/app/form/form-control/text-control.component"

const TAB_CONTROL_SUFFIX = "-tab-control"
const TAB_PANEL_SUFFIX = "-tab-panel"

@Directive({
  selector: "[tabPanel]",
})
export class TabPanelDirective implements OnInit {
  @Input()
  tabPanel!: string

  @HostBinding("attr.role")
  role: string = "tabpanel"

  @HostBinding("attr.id")
  get id(): string {
    return this.tabPanel + TAB_PANEL_SUFFIX
  }

  @HostBinding("attr.aria-labelledBy")
  get labelledBy(): string {
    return this.tabPanel + TAB_CONTROL_SUFFIX
  }

  constructor(
    private _tabs: TabsDirective,
    private _el: ElementRef,
    private _render: Renderer2,
  ) {}

  ngOnInit(): void {
    this._tabs.register(this.tabPanel)

    this._tabs.activeTab.subscribe((activeTab: string) => {
      this._setAttributes({ active: activeTab === this.tabPanel })
    })
  }

  private _setAttributes({ active }: { active: boolean }) {
    if (active) {
      this._render.removeAttribute(this._el.nativeElement, "hidden")
    } else {
      this._render.setAttribute(
        this._el.nativeElement,
        "hidden",
        active.toString(),
      )
    }

    this._render.setAttribute(
      this._el.nativeElement,
      "tabIndex",
      active ? "0" : "-1",
    )
  }
}

@Directive({
  selector: "[tabControl]",
})
export class TabControlDirective implements OnInit, OnDestroy {
  @Input()
  tabControl: string = ""

  @Input()
  activeClasses = ""

  @Input()
  inactiveClasses = ""

  @HostBinding("attr.role")
  role: string = "tab"

  // @HostBinding("attr.aria-selected")
  // get selected(): boolean {
  //   return this.active
  // }

  // @HostBinding("attr.tabIndex")
  // get tabIndex(): 0 | -1 {
  //   return this.selected ? 0 : -1
  // }

  @HostBinding("attr.id")
  get id() {
    return this.tabControl + TAB_CONTROL_SUFFIX
  }

  @HostBinding("attr.aria-controls")
  get controls(): string {
    return this.tabControl + TAB_PANEL_SUFFIX
  }

  @HostListener("click")
  handleClick() {
    this._tabs.trigger(this.tabControl)
  }

  constructor(
    private _tabs: TabsDirective,
    private _el: ElementRef,
    private _renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this._tabs.register(this.tabControl)

    this._tabs.activeTab.subscribe((activeTab: string) => {
      const isActiveTab = activeTab === this.tabControl
      this._setAttributes({ active: isActiveTab })
      if (isActiveTab) {
        this._addClasses(this.activeClasses)
        this._removeClasses(this.inactiveClasses)
      } else {
        this._addClasses(this.inactiveClasses)
        this._removeClasses(this.activeClasses)
      }
    })
  }

  ngOnDestroy(): void {
    this._tabs.clear(this.tabControl)
  }

  private _setAttributes({ active }: { active: boolean }) {
    this._renderer.setAttribute(
      this._el.nativeElement,
      "aria-selected",
      active.toString(),
    )
    this._renderer.setAttribute(
      this._el.nativeElement,
      "tabIndex",
      active ? "0" : "-1",
    )
  }

  private _removeClasses(classes: string) {
    if (!classes) return
    classes
      .split(" ")
      .forEach(className =>
        this._renderer.removeClass(this._el.nativeElement, className),
      )
  }

  private _addClasses(classes: string) {
    if (!classes) return
    classes
      .split(" ")
      .forEach(className =>
        this._renderer.addClass(this._el.nativeElement, className),
      )
  }
}

@Directive({
  selector: "[tabControls]",
})
export class TabControlsDirective implements OnInit {
  @HostBinding("attr.role")
  role: string = "tablist"

  @HostBinding("attr.aria-label")
  @Input()
  tabControls: string = ""

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {}
}

@Directive({
  selector: "[tabs]",
})
export class TabsDirective implements OnInit, AfterViewInit {
  tabs: string[] = []

  @Output()
  activeTab: EventEmitter<Maybe<string>> = new EventEmitter<Maybe<string>>()

  @Input()
  defaultActive: Maybe<string>

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {}

  register(id: string) {
    this.tabs.push(id)
  }

  clear(id: string) {
    this.tabs.filter(controlId => controlId !== id)
  }

  ngAfterViewInit(): void {
    this.trigger(this.defaultActive || this.tabs[0])
  }

  trigger(id: string) {
    this.activeTab.emit(id)
  }
}

const declarations = [
  TabControlsDirective,
  TabPanelDirective,
  TabControlDirective,
  TabsDirective,
]
@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class TabsModule {}
