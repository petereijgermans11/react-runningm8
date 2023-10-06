
# Documentation and justification

This app has been made with open source packages and software.\
Underneath is specified which packages and software has been used and why.

####main frameworks and packages
For the main stack I have chosen for a React application which will be Typescript based.\
I have chosen for typescript because it eliminates a lot of uncertaincies which are in vanilla javascript\
The typing also quickens development as there is no need to endless log a variable to see whats inside it.\
State management is handled by redux, and for the local inputs I made use of react hooks.

I have chosen for redux because it has great React wrappers for the provider and the store is easy to use once accostumed to it.\
On the backside of the app will be Firebase, because that was part of the non-functional agreements.\
The data will be cached in indexedDB for quick access as redux empties when the app closes.

For navigation i solely trust on react router. It never disappoints.\
It is dynamic in the navigation itself as it comes with 2 components and multiple hooks for it.

package names                          |version
---------------------------------------|------------------------
react                                  | 17.0.2         
react-dom                              | 17.0.2 
react-router-dom                       | 6.2.1    
react-scripts                          | 5.0.0                            
typescript                             | 4.5.5 
redux                                  | 4.1.2
firebase                               | 9.6.6 
sass                                   | 1.49.7 

####React wrapper packages
These packages are all react component wrappers\
They make development a lot easier and faster as they often\
come with pre-built functionality.

package names                          |version
---------------------------------------|------------------------
react-firebase-hooks                   | 5.0.3 
react-redux                            | 7.2.6  
react-i18next                          | 11.15.7  
react-leaflet                          | 3.2.5 

####Packages used to complete or integrate functionality
The following packages are needed for the main operations of the app.\
I will justify my choices for each of these underneath. 

package names                          |version
---------------------------------------|------------------------
i18next                                | 21.6.14 
nosleep.js                             | 0.12.0 
leaflet                                | 1.7.1 
react-modal                            | 3.14.4 
react-toastify                         | 8.2.0 
recharts                               | 2.1.9 

#####i18next
This is the translation packages. Has lots of good reviews, loads of downloads and tutorials.\
It is widely used and works liek a charm. It is very easy in use and namespaces can easily be added.

#####nosleep.js
This package is needed for recording a session. It keeps the screen on so the location keeps recording.

#####leaflet
This is the free maps package that i use. I have mainly chosen this because it comes with react wrappers.\
It is also easy to use and widely used, so tutorials are in overflowing quantities.

#####react-modal
I use this package in about all apps that i implement modals. It is easy to use\
and it leaves me free in styling choices and content. I could make it myself, but that costs 2 hours more fo developing.

#####react-toastify
I used this to show error messages. This could also be used as notification for push messages.

#####recharts
This is the chart package that i use. Just as with the leaflet package, \
it is easy to use and comes with pre-built react wrapper.\
so it saves development time in general to use. There were different options, \
but this one stood out most for meas it had most variety of types of charts.

####Icons
For the icons i have used font awesome because the package is widely used and above all easy to use.

font awesome packages                  |version
---------------------------------------|------------------------
@fortawesome/fontawesome-svg-core      | 1.3.0
@fortawesome/free-brands-svg-icons     | 6.0.0
@fortawesome/free-solid-svg-icons      | 6.0.0
@fortawesome/react-fontawesome         | 0.1.17
font-awesome                           | 4.7.0                                  
                                       
###state management tools

state management extra packages        |version
---------------------------------------|------------------------
@reduxjs/toolkit                       | 1.7.2
                               
 
###testing libraries
These are the packages used for testing.\
I use vanilla mocha and chai for unit testing,\
together with jest-dom and user-event.

For coverage i have chosen for codecov. I use nyc as a coverage tool, \
as plain mocha is not able to create coverage reports.\
It is free and easy to use.

For end to end testing i use cypress,\
as it is a non functional requirement.

testing packages                       |version
---------------------------------------|------------------------
@testing-library/jest-dom              | 5.16.2
@testing-library/react                 | 12.1.2
@testing-library/user-event            | 13.5.0 
chai                                   | 4.3.6 
mocha                                  | 9.2.2
codecov                                | 3.8.3
cypress                                | 9.5.2
nyc                                    | 15.1.0                                    

###Types libraries 
pre-made types for support on typescript

types packages                         |version
---------------------------------------|------------------------
@types/jest                            | 27.4.0 
@types/leaflet                         | 1.7.9 
@types/node                            | 16.11.22 
@types/react                           | 17.0.39 
@types/react-dom                       | 17.0.11 
@types/react-modal                     | 3.13.1 
@types/react-redux                     | 7.1.22   

####Deployment libraries
needed for github pages

package names                          |version
---------------------------------------|------------------------
gh-pages                               | 3.2.3 





