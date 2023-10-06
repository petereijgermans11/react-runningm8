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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('enterWeight', () => {
    cy.get('[data-cy=inputWeight]').click()
    cy.get('[data-cy=inputWeight]').clear()
    cy.get('[data-cy=inputWeight]').type('0123456789')
    cy.get('[data-cy=inputWeight]').should('have.value', '0123456789')
})
Cypress.Commands.add('enterHeight', () => {
    cy.get('[data-cy=inputHeight]').click()
    cy.get('[data-cy=inputHeight]').clear()
    cy.get('[data-cy=inputHeight]').type('0123456789')
    cy.get('[data-cy=inputHeight]').should('have.value', '0123456789')
})
Cypress.Commands.add('enterGoal', () => {
    cy.get('[data-cy=inputGoal]').click()
    cy.get('[data-cy=inputGoal]').clear()
    cy.get('[data-cy=inputGoal]').type('0123456789')
    cy.get('[data-cy=inputGoal]').should('have.value', '0123456789')
})
