// https://docs.cypress.io/api/introduction/api.html

describe('Routing', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to RunningFeet')
  })
  it('Visits Workout url', () => {
    cy.visit('#/workout')
    cy.contains('h1', 'Workout')
  })
  it('Visit schemas url whilst logged out', () => {
    cy.visit('#/schemas')
    cy.contains('h1', 'Log eerst in!')
  })
  it('Should display empty schema with edit', () => {
    cy.visit('#/schemas/editSchema')
    cy.contains('Nog geen activiteiten!')
  })
  it('Should error when visiting editSchema with a invalid id', () => {
    cy.visit('#/schemas/editSchema/abcdefghijklmnopqrstuvwxyz')
    cy.contains('Er is iets fout gegaan!')
  })
})
