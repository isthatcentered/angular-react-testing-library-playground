import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { Maybe } from "../../types"

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
  hint: Maybe<TemplateRef<any>>

  @ContentChild("hint")
  hintTemplate: any

  ngAfterContentInit(): void {}
}

@NgModule({
  declarations: [ShowcaseComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ShowcaseComponent],
})
export class ShowcaseModule {}
