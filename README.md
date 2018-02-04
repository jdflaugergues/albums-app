# Albums App
An application that allows a user to create a list of favourite albums from iTunes.

## How to run it
Clone the project and in the albums-app directory, launch the following commands:
 
	$ npm install
	$ npm start

## Description
This application is a small front end which allow a user to search for artists and get a list of the albums associated with that artist. A user is able to add and remove an album to a list of favorites. Th user is also able to filter the list of favorites by artist. 
The application has a left navigation bar (bottom navigation bar on mobile devices) with two menu. One to go on albums research page and the other to view all favorite albums of the user.

###### Research menu
The research menu page contain a search bar on the top. The user enter an artist name on it and the results of its research is displayed after a debounce of 500 ms. If there is not result, an information message of no result is displayed. On the albums grid, each album is represented by its covert art and its name and artist name. To add an album to favorite, the user has to click on the album. And to remove it, he has to do the same.

###### My Favorites
This menu allows to the user to see all its albums previously added to my favorite. This menu has search bar on the top to filter the list of favorites by artist. If there is no result, an information message of no result is displayed. To remove a favorite album from favorites, the user just has to click on this one.  
 

##Design and implementation decisions

The application is build with React Javascript Framework. The `react-router-dom` is used to handle the _routes_ navigation. Data application is shared with `redux`. Then, the store is configured into the __configure-store__ component. All the actions are in __actions__ folder, and reducers in the __reducers__ folder.
The folder __common__ contains a file with common theme used by application components.
And the folder __components__ contains all components of the application

All data collection is managed by __lodash__ library.
The __debounce__ library is used in search bar component to launch request to the server only when he stop the enter text and to prevent to send request on each character typed.
About the favorites album, they are store in the navigator local storage to keep them when reloading page.
 
 About responsive design, the application support 2 different resolution. One under 480 width pixel intended mobile devices and the other one above 480 width pixel for desktop.
 