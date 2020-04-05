import { Component, EventEmitter, Input, NgModule, Output } from "@angular/core"
import { Event, EventId } from "../events-home.component"
import { CommonModule } from "@angular/common"
import { EventsSharedModule } from "../../events-shared/events-shared.module"

@Component({
  selector: "no-events-available",
  template: `
    <h1>no-events-available</h1>
  `,
})
export class NoEventsAvailableComponent {}

@Component({
  selector: "events-upcoming-list",
  template: `
    <ng-container *ngIf="appointments; else loading">
      <no-events-available
        *ngIf="appointments.length === 0"
      ></no-events-available>
    </ng-container>

    <ng-template #loading>
      <app-loading></app-loading>
    </ng-template>
  `,
})
export class UpcomingEventsListComponent {
  @Input()
  appointments: Event[] = []

  @Output()
  onClickedEvent: EventEmitter<EventId> = new EventEmitter<EventId>()
}

@NgModule({
  declarations: [UpcomingEventsListComponent, NoEventsAvailableComponent],
  imports: [CommonModule, EventsSharedModule],
  providers: [],
  exports: [UpcomingEventsListComponent],
})
export class UpcomingEventsListModule {}
