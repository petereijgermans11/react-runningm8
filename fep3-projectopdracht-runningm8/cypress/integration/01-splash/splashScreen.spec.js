describe('RunningM8 entry tests', () => {
    beforeEach(() => {
        cy.visit("https://hu-sd-v3fep3-studenten-2122.github.io/fep3-projectopdracht-runningm8/")
        // cy.visit("http://localhost:3000/fep3-projectopdracht-runningm8/")
    })
    it('Page has Link.', () => {
        cy.get('[data-cy=splash-link]').should('have.length', 1)
    })
    it('Can enter the app.', () => {
        cy.get('[data-cy=splash-link]').click()
    })
})
