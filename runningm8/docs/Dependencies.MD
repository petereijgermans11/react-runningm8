# Used Dependencies
In this document you can find the dependencies used for this project.

## Vue
**Version**: 2.6.11<br>
**Docs**: [Click here](https://v2.vuejs.org/v2/guide/) <br>
**About**: Vue is a javascript framework focussed on component driven webdesign. It enables the user to create a front-end
that makes use of reusable components to build up views.<br>
**Reasoning**: I am comfortable with Vue and it was a requirement of Hogeschool Utrecht.

## Vue-router
**Version**: 3.2.0<br>
**Docs**: [Click here](https://router.vuejs.org/guide/) <br>
**About**: Vue-router is a plugin for Vue that enables the usage of a router. It matches the url-route and shows the
corresponding view. Because of Vue-router you enable the creation of a Single-page application. Which essentially means
that you won't see refreshes whilst navigating the application.<br>
**Reasoning**: Single-page applications are becoming the standard and it makes the application feel great and responsive.

## Vuetify
**Version**: 2.4.0<br>
**Docs**: [Click here](https://vuetifyjs.com/en/introduction/why-vuetify/) <br>
**About**: Vuetify is a complete UI framework built on top of Vue.js. It provides developers 
with the tools they need to build rich and engaging user experiences.<br>
**Reasoning**: I used Vuetify to make the application look more refined and to spend less time on styling. Since I do this
project alone.

## Firebase
**Version**: 9.6.7<br>
**Docs**: [Click here](https://firebase.google.com/docs) <br>
**About**: It essentialy provides a backend for your application. Firestore is part of Firebase, which is a noSQL type
database. It also enables authentication from Google and other Third Parties. (Facebook, Github, Twitter to name a few.)
<br>
**Reasoning**: It was a requirement of Hogeschool Utrecht and I needed a quick backend to store and retrieve data. Furthermore
it enables me to host the application on their services and provides me of ways to send Push-notifications.

## RegisterServiceWorker
**Version**: <br>
**About**: The service worker is a web API that helps you cache your assets and other files so that when the user is 
offline or on slow network, he/she can still see results on the screen, as such, it helps you build a better user 
experience. This got added by the command ``vue add pwa``.<br>
**Reasoning**: It was a requirement of Hogeschool Utrecht and I wanted to cache the application so it enables user to
have faster load times and offline capability. Furthermore it enables the user to install the app.

