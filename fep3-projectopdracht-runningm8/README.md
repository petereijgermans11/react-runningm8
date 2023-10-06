[![CI/CD](https://github.com/HU-SD-V3FEP3-studenten-2122/fep3-projectopdracht-runningm8/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/HU-SD-V3FEP3-studenten-2122/fep3-projectopdracht-runningm8/actions/workflows/node.js.yml)
[![RunningM8](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/58ijy4&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/58ijy4/runs)
[![codecov](https://codecov.io/gh/HU-SD-V3FEP3-studenten-2122/fep3-projectopdracht-runningm8/branch/feature/testing/graph/badge.svg?token=KPOFGEHMNS)](https://codecov.io/gh/HU-SD-V3FEP3-studenten-2122/fep3-projectopdracht-runningm8)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# RunningM8 READ ME


Welcome to the RunningM8 app.
This app is created for health purposes.


This is the official RunningM8 repository.

This app is meant for anyone who wishes to track their fitness results.\
It tracks the route that you run and is even available offline as a PWA.

This page only handles installation.\
Click here to see all [Docs and justification.](./docs/README.MD "docs and justification")

The official build is available on:\
[RunningM8!](https://hu-sd-v3fep3-studenten-2122.github.io/fep3-projectopdracht-runningm8)


- - - - 

##Installation:
All you need to do is install the dependencies and then you could start the app locally.
###Install the applications dependencies

`npm install` 

##Usage:

### Run the app local

`npm run start`

### Build & Deploy the app

Although the app is begin deployed by the CI/CD script,\
you could eventually deploy the application from the local machine to github pages.\
You do that with the command:

`npm run deploy`

To build the app use:

`npm run build`

## Tests

The application has some tests. And with some I mean 'ein bisschen'.\
Although it is not much, the basics are there and it only needs extension.\
Code coverage has been added with CodeCov. Unit testing has been done with Mocha and Chai.\
End to End testing has been covered with Cypress.

#### unit tests
To start the unit tests:

`npm test:unit`

#### tests with coverage
To start unit tests with coverage:

`npm test-with-coverage`

#### E2E tests
To start the end to end tests:

`cypress run` or..

use the cypress UI:

`cypress open`

