describe('RunningM8 02-firstUse test', () => {
    beforeEach(() => {
        cy.visit("https://hu-sd-v3fep3-studenten-2122.github.io/fep3-projectopdracht-runningm8/")
        // cy.visit("http://localhost:3000/fep3-projectopdracht-runningm8/")
        cy.get('[data-cy=splash-link]').click()

    })
    describe('Welcome screen', () => {
        it('should be the first use of the app.', () => {
            cy.url().should('include', 'firstUse/welcome')
        })
        it('Can go to next screen', () => {
            cy.get('[data-cy=button-continue]').click()
            cy.url().should('include', 'firstUse/gender')
        })
        describe('Welcome screen language tests', () => {
            it('Language starts off with English.', () => {
                cy.get('[data-cy=flagEnglish]').click()
                cy.get('[data-cy=welcome-title]').should('have.html', "Welcome to RunningM8!")
            })
            it('Language can change to German.', () => {
                cy.get('[data-cy=flagGerman]').click()
                cy.get('[data-cy=welcome-title]').should('have.html', "Willkommen bei RunningM8!")
            })
            it('Language can change to Dutch.', () => {
                cy.get('[data-cy=flagDutch]').click()
                cy.get('[data-cy=welcome-title]').should('have.html', "Welkom bij RunningM8!")
            })
            it('Language can change to Spanish.', () => {
                cy.get('[data-cy=flagSpanish]').click()
                cy.get('[data-cy=welcome-title]').should('have.html', "Bienvenido a RunningM8!")
            })
            it('Language can change to Italian.', () => {
                cy.get('[data-cy=flagItalian]').click()
                cy.get('[data-cy=welcome-title]').should('have.html', "Benvenuto in RunningM8!")
            })
            it('Language can change to French.', () => {
                cy.get('[data-cy=flagFrench]').click()
                cy.get('[data-cy=welcome-title]').should('have.html', "Bienvenue sur RunningM8!")
            })
        })
    })

    describe('Gender screen', () => {
        beforeEach(() => {
            cy.get('[data-cy=button-continue]').click()
        })
        it('should have a certain url', () => {
            cy.url().should('include', 'firstUse/gender')
        })
        it('can click on male button and go to the next screen.', ()=>{
            cy.get('[data-cy=buttonMale]').click()
            cy.url().should('include', 'firstUse/weight')
        })
        it('can click on female button and go to the next screen.', ()=>{
            cy.get('[data-cy=buttonFemale]').click()
            cy.url().should('include', 'firstUse/weight')
        })
    })
    describe('Weight Screen', () => {
        beforeEach(() => {
            cy.get('[data-cy=button-continue]').click()
            cy.get('[data-cy=buttonMale]').click()
        })
        it('should have a certain url', () => {
            cy.url().should('include', 'firstUse/weight')
        })
        it('should be able to enter weight', () => {
            cy.enterWeight()
            cy.get('[data-cy=buttonConfirm]').click()
            cy.url().should('include', 'firstUse/height')
        })
    })
    describe('Height Screen', () => {
        beforeEach(() => {
            cy.get('[data-cy=button-continue]').click()
            cy.get('[data-cy=buttonMale]').click()
            cy.enterWeight()
            cy.get('[data-cy=buttonConfirm]').click()
        })
        it('should have a certain url', () => {
            cy.url().should('include', 'firstUse/height')
        })
        it('should be able to enter height', () => {
            cy.enterHeight()
            cy.get('[data-cy=buttonConfirm]').click()
            cy.url().should('include', 'firstUse/goal')
        })
    })

    describe('Goal Screen', () => {
        beforeEach(() => {
            cy.get('[data-cy=button-continue]').click()
            cy.get('[data-cy=buttonMale]').click()
            cy.enterWeight()
            cy.get('[data-cy=buttonConfirm]').click()
            cy.enterHeight()
            cy.get('[data-cy=buttonConfirm]').click()
        })
        it('should have a certain url', () => {
            cy.url().should('include', 'firstUse/goal')
        })

        it('should start off with a distance goal', () => {
            cy.get('[data-cy=buttonDistance]').should('have.css', 'background-color','rgba(255, 125, 255, 0.2)')
        })
        it('should be able to switch to the other unit.', () => {
            cy.get('[data-cy=buttonDuration]').click()
            cy.get('[data-cy=buttonDistance]').click()
        })

        it('should be able to enter goal', () => {
            cy.enterGoal()
        })

        it('should let me into the app now a goal has been set', () => {
            cy.enterGoal()
            cy.get('[data-cy=buttonConfirm]').click()
            cy.url().should('eq', 'https://hu-sd-v3fep3-studenten-2122.github.io/fep3-projectopdracht-runningm8/')
            // cy.url().should('eq', 'http://localhost:3000/fep3-projectopdracht-runningm8/')

            cy.get('[data-cy=splash-link]').click()
            cy.url().should('include', '/app/home')
        })
    })

})
