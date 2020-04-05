import {
  Event,
  EventId,
  EventsHomeComponent,
  EventsHomeModule,
  EventsService,
} from "./events-home.component"
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from "@angular/core/testing"
import { of } from "rxjs"
import { MockComponent } from "ng-mocks"
import { EventDetailsComponent } from "./event-detail/event-detail.component"
import { UpcomingEventsListComponent } from "./upcoming-events-list/upcoming-events-list.component"
import { fake, getByDirective, provideFake } from "../../helpers"

describe(`${EventsHomeComponent}`, () => {
  describe(`Page load`, () => {
    test("Passes the appointment list to the sidebar", () => {
      const { appointments, get } = makePage([
        <Event>{
          client: "Client0",
          id: fake<EventId>("event_id_0"),
        },
      ])
      expect(
        get(UpcomingEventsListComponent).componentInstance.appointments,
      ).toBe(appointments)
    })

    test(`Passes the first appointment by default to the ${EventDetailsComponent}`, () => {
      const { appointments, get } = makePage([
        <Event>{
          client: "Client0",
          id: fake<EventId>("event_id_0"),
        },
      ])

      expect(get(EventDetailsComponent).componentInstance.appointment).toBe(
        appointments[0].id,
      )
    })
  })
  describe(`Selecting an event`, () => {
    test(`Passes the selected event to ${EventDetailsComponent}`, () => {
      const { fixture, appointments, get } = makePage([
        <Event>{
          client: "Client0",
          id: fake<EventId>("event_id_0"),
        },
        <Event>{
          client: "Client1",
          id: fake<EventId>("event_id_1"),
        },
      ])

      const selected = appointments[1]!.id

      get(UpcomingEventsListComponent).componentInstance.onClickedEvent.emit(
        selected,
      )

      fixture.detectChanges()

      expect(get(EventDetailsComponent).componentInstance.appointment).toBe(
        selected,
      )
    })
  })

  test.todo(`I can sort items`)
  test.todo(`I can filter items`)
})

function makePage(appointments: Event[]) {
  TestBed.configureTestingModule({
    declarations: [
      MockComponent(UpcomingEventsListComponent),
      MockComponent(EventDetailsComponent),
    ],
    imports: [EventsHomeModule],
    providers: [
      { provide: ComponentFixtureAutoDetect, useValue: true },
      provideFake({
        type: EventsService,
        fake: {
          appointments$: of(appointments),
        },
      }),
    ],
  })

  const fixture: ComponentFixture<EventsHomeComponent> = TestBed.createComponent(
      EventsHomeComponent,
    ),
    component: EventsHomeComponent = fixture.componentInstance,
    get = getByDirective(fixture)

  return { fixture, component, appointments, get }
}
