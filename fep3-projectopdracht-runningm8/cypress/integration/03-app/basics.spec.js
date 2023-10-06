describe('RunningM8 03-app basics test', () => {
    beforeEach(() => {
        cy.visit("https://hu-sd-v3fep3-studenten-2122.github.io/fep3-projectopdracht-runningm8/")
        // cy.visit("http://localhost:3000/fep3-projectopdracht-runningm8/")
        cy.get('[data-cy=splash-link]').click()
    })
    describe('should check the footer', () => {
        it('can go to the schema-screen', () => {
            cy.get('[data-cy=buttonSchemas]').click()
            cy.url().should('include', '/app/schemas')
        })
        it('can go to the run-screen', () => {
            cy.get('[data-cy=buttonRun]').click()
            cy.url().should('include', '/app/run')
        })
        it('can go to the analyse-screen', () => {
            cy.get('[data-cy=buttonAnalysis]').click()
            cy.url().should('include', '/app/analysis')
        })
        it('can go to the profile-screen', () => {
            cy.get('[data-cy=buttonProfile]').click()
            cy.url().should('include', '/app/profile')
        })
        it('can go back to home', () => {
            cy.get('[data-cy=buttonHome]').click()
            cy.url().should('include', '/app/home')
        })
    })
})
