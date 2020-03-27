import { Component, Input, NgModule } from "@angular/core"
import { CompoundToggleModule } from "./compound-toggle.module"
import { PaddedValueDirective } from "./padded-value.directive"
import { CommonModule } from "@angular/common"
import { RenderPropToggleModule } from './render-prop-toggle.module';

@Component({
  selector: "showcase",
  template: `
    <div class="py-8 border-b border-b-gray-300">
      <h2 class="font-bold text-base mb-4">{{ name }}</h2>
      <ng-content></ng-content>
    </div>
  `,
})
export class ShowcaseComponent {
  @Input()
  name!: string
}

const modules = [CompoundToggleModule, CommonModule, RenderPropToggleModule]
const declarations = [PaddedValueDirective, ShowcaseComponent]

@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  providers: [],
  exports: [...modules, ...declarations],
})
export class ExamplesModule {}
