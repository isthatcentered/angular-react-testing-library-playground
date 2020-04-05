import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LoadingComponent } from "./loading.component"

let declarations = [LoadingComponent]

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class EventsSharedModule {}
