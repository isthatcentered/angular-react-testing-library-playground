import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { TestingRoutingModule } from "./testing-routing.module"
import { TestingHomePageComponent } from "./testing-home-page.component"

@NgModule({
  declarations: [TestingHomePageComponent],
  imports: [CommonModule, TestingRoutingModule],
})
export class TestingModule {}
