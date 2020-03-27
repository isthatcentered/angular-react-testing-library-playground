// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      findByRoleAndLabel(
        role: string,
        label: RegExp,
        attrs?: Record<any, any>,
      ): Chainable<JQuery>
    }
  }
}

Cypress.Commands.add(
  "findByRoleAndLabel",
  (role: string, label: RegExp, attrs: Record<any, any> = {}) => {
    cy.findByRole((itemRole, el) => {
      if (
        itemRole !== role ||
        label.test(el.closest("label")?.textContent || "")
      )
        return false

      return true

      const attributesMatches = Object.keys(attrs).reduce((passes, attr) => {
        console.log(passes && (el as any)[attr] === attrs[attr])
        return passes && (el as any)[attr] === attrs[attr]
      }, true)

      return attributesMatches
    })
  },
)

export default undefined
