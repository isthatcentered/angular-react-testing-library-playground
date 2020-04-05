import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { TestingRoutingModule } from "./testing-routing.module"
import { EventsHomeModule } from "./events/event-home/events-home.component"

@NgModule({
  declarations: [],
  imports: [CommonModule, TestingRoutingModule, EventsHomeModule],
})
export class TestingModule {}
