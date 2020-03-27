import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgModule,
  Output,
  TemplateRef,
} from "@angular/core"
import { Maybe } from "../form/form-control/text-control.component"
import { CommonModule } from "@angular/common"

@Component({
  selector: "render-prop-toggle, [render-prop-toggle]",
  template: `
    <ng-container
      *ngTemplateOutlet="template; context: { on: on, toggle: toggleState }"
    ></ng-container>
  `,
})
export class RenderPropToggleComponent {
  @Input()
  on: boolean = false

  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter<boolean>()

  @ContentChild(TemplateRef)
  template: Maybe<TemplateRef<any>>

  toggleState = () => {
    this.on = !this.on
    this.onToggle.emit(this.on)
  }
}

@NgModule({
  declarations: [RenderPropToggleComponent],
  imports: [CommonModule],
  providers: [],
  exports: [RenderPropToggleComponent],
})
export class RenderPropToggleModule {}
