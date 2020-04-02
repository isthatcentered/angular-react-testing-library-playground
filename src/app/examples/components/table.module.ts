import {
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from "@angular/core"
import { CommonModule } from "@angular/common"

type TableConfig = {
  headers: string[]
  items: { book: string; author: string }[]
}

@Component({
  selector: "examples-table",
  template: `
    <ng-template #fallback></ng-template>
    <table *ngIf="config">
      <tr *ngFor="let header of config.headers; let rowIndex = index">
        <th>{{ header }}</th>
        <td *ngFor="let item of config.items; let colIndex = index">
          <ng-container
            *ngTemplateOutlet="
              template || fallback;
              context: { $implicit: config.items[colIndex], item: config.items[colIndex], row: header}
            "
          >
          </ng-container>
        </td>
      </tr>
    </table>
  `,
})
export class TableComponent {
  @ContentChild(TemplateRef)
  template: TemplateRef<any> | undefined

  @Input()
  config: TableConfig | undefined
}

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
