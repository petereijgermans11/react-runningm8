#Justification

Welcome at the justification of choices of the architecture of the RunningM8.
This page is 

To go to the package justification\
 [click me](./packages.md)


##disclaimer
Because of time shortage, unit tests have been scrapped. I added 1, but i was planning to only test the store and util functions and such.\
Yet it looked like a lot of work to unit test the store and the components. To be fair, i would an extra 2 weeks for that.
The ui-components would be tester by cypress. I did a few cypress tests to get used to it.

## architecture

I have followed the MV* principle and where possible i worked towards a ddd apporach. \
I was careful for the seperation of concerns, so the ui components handle the ui, 
the calculations by the store in combination with util function.

I took care to use pure functions in the utils, because side effects is something for hooks and thunk-methods.
Navigation is handled and the 2 wat split in the app is made possible with the Outlet method of React Router v6.

I seperated the styling and made sure to give reasonable names to classes so that they can be re-used throughout the app.

There might be some errors in the trnaslation package, because i used google translate for them. 
