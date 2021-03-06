// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import * as commands from './commands'` syntax
import  "./commands"
import "@testing-library/cypress/add-commands"

Cypress.on("window:before:load", win => {
  const _consoleInfo = win.console.info
  win.console.info = function() {
    if (arguments[0].includes("App updated.")) {
      cy.$$(".restart", top.document).click()
    }
    return _consoleInfo.apply(win.console, arguments as any)
  }
})
