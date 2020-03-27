import {
  Component,
  Directive,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "compound-toggle-off",
  template: `
    <ng-content *ngIf="!toggleDirective.checked"></ng-content>
  `,
})
export class CompoundToggleOffComponent {
  constructor(public toggleDirective: CompoundToggleDirective) {}
}

@Component({
  selector: "compound-toggle-on",
  template: `
    <ng-content *ngIf="toggleDirective.checked"></ng-content>
  `,
})
export class CompoundToggleOnComponent {
  constructor(public toggleDirective: CompoundToggleDirective) {}
}

@Component({
  selector: "compound-toggle-button",
  template: `
    <label class="block pb-4">
      <input
        (change)="handleChange()"
        [checked]="toggleDirective.checked"
        type="checkbox"
      />
      Toggle me this
    </label>
  `,
})
export class CompoundToggleButtonComponent {
  constructor(public toggleDirective: CompoundToggleDirective) {}

  handleChange() {
    this.toggleDirective.toggleStatus()
  }
}

@Directive({
  selector: "app-toggle, [compound-toggle]",
})
export class CompoundToggleDirective {
  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input()
  checked: boolean = false

  toggleStatus() {
    this.checked = !this.checked
    this.onToggle.emit(this.checked)
  }
}

@NgModule({
  declarations: [
    CompoundToggleOffComponent,
    CompoundToggleOnComponent,
    CompoundToggleButtonComponent,
    CompoundToggleDirective,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    CompoundToggleOffComponent,
    CompoundToggleOnComponent,
    CompoundToggleButtonComponent,
    CompoundToggleDirective,
  ],
})
export class CompoundToggleModule {}
