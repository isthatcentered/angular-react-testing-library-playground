import { AuthService, HasRoleDirective } from "./has-role.directive"
import { provideFake, render, scenario } from "../../helpers"
import { of } from "rxjs"

describe(`${HasRoleDirective.name}`, () => {
  scenario(`User has role`, () => {
    test(`Element is displayed`, async () => {
      const { ...utils } = await render(HasRoleDirective, {
        template: `
        <p *appHasRole="'admin'" >I should show up</p>
        `,
        componentProperties: {},
        providers: [
          provideFake({
            type: AuthService,
            fake: { user$: of({ roles: ["admin"] }) },
          }),
        ],
      })

      expect(utils.container).toHaveTextContent(/I should show up/i)
    })
  })

  scenario(`User doesn't have role`, () => {
    test(`Element is hidden`, async () => {
      const { ...utils } = await render(HasRoleDirective, {
        template: `
        <p *appHasRole="'admin'" >I should NOT show up</p>
        `,
        componentProperties: {},
        providers: [
          provideFake({
            type: AuthService,
            fake: {
              user$: of({ roles: ["not_admin"] }),
            },
          }),
        ],
      })

      expect(utils.container).not.toHaveTextContent(/I should NOT show up/i)
    })
  })
})
