# Architecture

## Code structure
The code structure is conform the MVC-Model.<br>
Lets start with the src directory.
<hr>

**src**
- components
    - In this directory you will find Components that get reused over different views.
- controllers
    - In this directory you will find controller functions that get reused over multiple views/components.
    In this case we have two controllers. An audio controller and a time controller. These provide functions to play
    audio and format time respectively. These can also be seen as helper functions.
- router
    - Here you will find the router initialization file. The router provides routing for our Vue app and with correct
    usage you will not encounter page refreshes, and it will behave as a single page application.
- services
    - In this directory you will find multiple service files that will fetch data from the firestore.
- views
    - In this directory you will the views that the Router uses. Views contain HTML, Scripts and imports of other
    components.
    
The /src/ directory is where all the magic happens. In the root of the src directory you will find three files.
- main.js
    - This file creates initializes the Vue app.
- registerServiceWorker.js
    - This file is needed to register a service worker. Aside from providing service worker functionality it will log
    how the service worker behaves.
- App.vue
    - Our top level component. Within App.vue you will find a router-view tag. Within this element the router will mount
    the corresponding view for the route.
<hr>

**public**
- img
    - In this directory you will find the favicons for the different browsers.

The index.html is our entry point. This contains a div with an id called "app". Within this div element the Vue app will
be mounted.  Furthermore you will find a firebase-messaging-sw.js This file creates a service-worker to enable firebase
push messages. The service-worker.js file is empty and is generated during the build step.
<hr>

## File Structure

[According to the internet this follows the standard Vue file structure.](https://simeonnortey.medium.com/how-to-structure-folders-in-your-vue-application-ea3934d56380)

This is the standard in most fields. Note that Vue does not force a given structure. However, this is the generally accepted
structure most developers use.
##Caching strategies
I have chosen not to focus on caching strategies because I worked on this project solo whilst other teams consisted of
three members.

## Data structure
There is only one Firestore data structure being used. Called schemas.
```
schema: {
  name: "Title",                                  // Name of the schema
  timestamp: "March 8, 2022 at 2:46:06 PM UTC+1", // When was this created or updated?
  user: "KXkHIx4lLCRa1RhPvDPKQRM2Isg2",           // UserId for authentication.
  activities:[
    {
      activity: "Sprint",                         // Activity that get displayed
      duration: 120,                              // Duration of activity in seconds, in this example 2 minutes
      index: 1                                    // Order of the activities
    }
  ]
}
```
## Class Diagram
```mermaid
classDiagram
    class ActivityTypes{
        <<enumeration>>
        HARDLOPEN
        SPRINT
        WANDELEN
        RUST
    }
    Schema "1" -- "1..*" Activity : activities
    Schema "0..*" -- "1" User : ownedBy
    Schema : +string UserId
    Schema : +String Timestamp
    Activity : +int index
    Activity : +int duration
    Activity : +ActivityTypes activity
    User : +string id
```

## Testing
Static code has been applied and enforced by Eslint. 

I have dabbled in e2e tests and unit tests but I found that it would take me too much time considering I am one person
whilst other groups consist of three members. I have touched to see how it would work and got it working and got the
general idea of it. 
