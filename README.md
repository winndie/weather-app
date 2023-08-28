### Features
- [ ] City Input - Not implemented
- [X] Postcode Input - Implemented, If search text is not a valid postcode, no result will be shown 
- [X] Current Weather - Implemented with temperature, weather code, wind speed and direction 
- [X] Weather Forecast - Implemented with hourly weather
- [X] Geolocation - Not implemented
- [X] Data Storage - Implemented with SQLite, search result is stored in weatherSQLite.db
- [X] Offline First - Implemented, stored search result can be retrieved when app is re-open.

### Running the application locally

**Prerequisite:** 
- [Node.js](https://nodejs.org/en/)
- [Android Studio Device Management]
- [XCode]
- [XCode-select]

Clone this repository onto your machine

Run:

```
npm install
```

This will install dependencies and create a `node_modules` folder locally.

To start the application on browser:

```
npm run start
```

The application will then be accessible at:

http://localhost:5173

To start the application on android:

```
npm run android
```

To start the application on iso (on Mac):

```
npm run ios
```

### Technology stack used
- [X] ReactTS
- [X] Capacitor
- [X] Framework7
- [X] Sqlite
