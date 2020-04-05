import { Component, Injectable, NgModule, OnInit } from "@angular/core"
import { Observable, of, Subject } from "rxjs"
import { CommonModule } from "@angular/common"
import { EventDetailsComponent } from "./event-detail/event-detail.component"
import { UpcomingEventsListModule } from "./upcoming-events-list/upcoming-events-list.component"
import { EventsSharedModule } from "../events-shared/events-shared.module"

export type ClientId = string & { readonly CLIENT_ID: Symbol }

export type EventId = string & {
  readonly APPOINTMENT_ID: Symbol
}

export interface Event {
  id: EventId
  date: Date
  client: ClientId
}

@Injectable({
  providedIn: "root",
})
export class EventsService {
  appointments$: Observable<Event[] | undefined> = of(undefined)
}

@Component({
  selector: "appointments-home-page",
  template: `
    <ng-container *ngIf="appointments$ | async as events; else loading">
      <events-upcoming-list
        [appointments]="events"
        (onClickedEvent)="clickedEvent$.next($event)"
      ></events-upcoming-list>

      <events-item-details
        [appointment]="(activeEvent$ | async) || events[0]?.id"
      ></events-item-details>
    </ng-container>
    <ng-template #loading>Loading...</ng-template>
  `,
})
export class EventsHomeComponent implements OnInit {
  // Actions observables
  clickedEvent$ = new Subject<EventId>()

  // State observables
  appointments$ = this._appointmentsService.appointments$
  activeEvent$ = this.clickedEvent$

  constructor(private _appointmentsService: EventsService) {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [EventsHomeComponent, EventDetailsComponent],
  imports: [CommonModule, EventsSharedModule, UpcomingEventsListModule],
  providers: [],
  exports: [],
})
export class EventsHomeModule {}
