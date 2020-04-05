import {
  NoEventsAvailableComponent,
  UpcomingEventsListComponent,
} from "./upcoming-events-list.component"
import { render } from "../../../helpers"
import { LoadingComponent } from "../../events-shared/loading.component"
import { MockComponent } from "ng-mocks"

const scenario = describe

describe(`${UpcomingEventsListComponent}`, () => {
  scenario(`Pending data`, () => {
    test(`Displays a loadging indicator`, async () => {
      const { getByDirective, ...utils } = await makeSut({
        appointments: undefined,
      })

      expect(getByDirective(LoadingComponent)).not.toBeNull()
    })

    test(`Data resolved hdes the loader`, async () => {
      const { getByDirective, ...utils } = await makeSut({
        appointments: [],
      })

      expect(getByDirective(LoadingComponent)).toBeNull()
    })
  })

  scenario(`Empty list`, () => {
    test(`Displays a "no events alert"`, async () => {
      const { getByDirective, ...utils } = await makeSut({
        appointments: [],
      })

      expect(getByDirective(NoEventsAvailableComponent)).not.toBeNull()
    })
  })

  scenario(`Items`, () => {
    test(`I can sort items`, async () => {
      const { getByDirective, ...utils } = await makeSut({
        appointments: [],
      })

      // utils.getByText(/sort/)
    })
    test(`I can filter items`, () => {})
    scenario(`Default sorting`, () => {})
    scenario(`Sorting items`, () => {})
  })

  scenario(`One favourite item`, () => {})
})

function makeSut(props: Partial<UpcomingEventsListComponent> = {}) {
  return render(UpcomingEventsListComponent, {
    declarations: [
      MockComponent(LoadingComponent),
      MockComponent(NoEventsAvailableComponent),
    ],
    componentProperties: props,
  })
}
