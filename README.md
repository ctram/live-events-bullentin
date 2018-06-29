# Live Events Bulletin

[Live link][live_events_bulletin]

[live_events_bulletin]: https://live-events-bulletin.herokuapp.com/login

**Technologies used:**
- React.js
- Backbone.js
- Express.js
- Passport.js
- Postgres
- Sequelize.js
- Bootstrap
- scrape-it.js

## Setup

Create an environmental variable named `ENVIRONMENT`, set it to `development`.

Create an environmental variable named `PG_USER`, set it to the Postgres user of choice.

```bash
# Example
ENVIRONMENT=development
PG_USER=chris
```

Ensure Postgres is running.

From within project directory.

Create a Postgres database named *live_events_bulletin*

Run the following commands:

```
npm install
./node_modules/webpack/bin/webpack.js
npm start
````

In a web browser, navigate to `localhost:3000`.

