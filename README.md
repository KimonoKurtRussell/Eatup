# EATUP

A single page application that helps you decide where to eat depending on where you are located.  This app works by calling the Yelp api and returns the restuarants in the radius that the user inputs.  Once the user has chosen a restaurant they are able to, if loggged in, start an event with a event name, start and end time.  If another user has an account they are able to join that event to let that person who stated the event know they are attending and they may also leave said event.

## Set-up
1. Fork & Clone.
2. npm install dependencies.
3. sign up for a developer api key for yelp.
4. insert that dev api key into .env folder.
5. run on localhost:3000


## Screenshots
!["Main Page with restaurant search"](https://github.com/KimonoKurtRussell/Eatup/blob/FinalVersion/docs/Screen%20Shot%202018-07-13%20at%201.35.25%20PM.png)
!["Swipe card with restaurants"](https://github.com/KimonoKurtRussell/Eatup/blob/FinalVersion/docs/Screen%20Shot%202018-07-13%20at%201.35.36%20PM.png)
!["Form submission for event creation"](https://github.com/KimonoKurtRussell/Eatup/blob/FinalVersion/docs/Screen%20Shot%202018-07-13%20at%201.37.25%20PM.png)
!["Event creation confirmation"](https://github.com/KimonoKurtRussell/Eatup/blob/FinalVersion/docs/Screen%20Shot%202018-07-13%20at%201.37.35%20PM.png)
!["Event list of all current events"](https://github.com/KimonoKurtRussell/Eatup/blob/FinalVersion/docs/Screen%20Shot%202018-07-13%20at%201.37.50%20PM.png)
!["Login modal"](https://github.com/KimonoKurtRussell/Eatup/blob/FinalVersion/docs/Screen%20Shot%202018-07-13%20at%201.36.05%20PM.png)

## Dependencies
    "body-parser": "^1.18.3",
    "cookie-session": "^2.0.0-beta.3",
    "cors": "^2.8.4",
    "dotenv": "^6.0.0",
    "express": "^4.16.2",
    "hover.css": "^2.3.2",
    "knex": "^0.15.0",
    "moment": "^2.22.2",
    "pg": "^7.4.3",
    "react": "^16.4.1",
    "react-alert": "^4.0.4",
    "react-alert-template-basic": "^1.0.0",
    "react-collapsible": "^2.2.0",
    "react-datetime-picker": "^1.3.4",
    "react-dom": "^16.4.1",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.4",
    "react-swipeable-views": "^0.12.14",
    "react-transition-group": "^2.4.0",
    "ws": "^5.2.1",
    "yelp-fusion": "^2.0.3"

## Known bugs
1.using arrow keys on user food type slection causes crash.
2.food searches might return null due to yelp food categories.
3.picking first restaurant will result in location not appearing in event confirm.

## Project Devs
Nolan Hardin,
Ram Sayoa,
Ashwin Khanna,
Anisa Thomas. 
