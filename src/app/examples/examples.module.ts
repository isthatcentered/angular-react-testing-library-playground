import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  NgModule,
  ViewChild,
} from "@angular/core"
import { CompoundToggleModule } from "./compound-toggle.module"
import { CommonModule } from "@angular/common"
import { RenderPropToggleModule } from "./render-prop-toggle.module"
import { DirectivesModule } from "./directives/directives.module"
import { Maybe } from "../form/form-control/text-control.component"

@Component({
  selector: "showcase",
  template: `
    <div class="py-8 border-b border-b-gray-300">
      <h2 class="font-bold text-base mb-4">{{ name }}</h2>
      <div
        *ngIf="hintTemplate || hint"
        class="-mt-2 mb-4 italic text-gray-500 text-sm"
      >
        <p *ngIf="hint && !hintTemplate">
          {{ hint }}
        </p>
        <ng-container *ngTemplateOutlet="hintTemplate"></ng-container>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class ShowcaseComponent implements AfterContentInit {
  @Input()
  name!: string

  @Input()
  hint: Maybe<string>

  @ContentChild("hint")
  hintTemplate: any

  ngAfterContentInit(): void {
    console.log(this.hintTemplate)
  }
}

const modules = [
  CompoundToggleModule,
  CommonModule,
  RenderPropToggleModule,
  DirectivesModule,
]
const declarations = [ShowcaseComponent]

@NgModule({
  declarations: [...declarations],
  imports: [...modules, DirectivesModule],
  providers: [],
  exports: [...modules, ...declarations],
})
export class ExamplesModule {}
