# Plant-Planner
This is a planner that allows one to add plants to a MongoDB database and be able to see its events, harvests, and other details about the plant

# How to Connect

First make sure you are connected to an actual database that follows the Models listed. Once your token is in place, run 

### npm run start

This will start the web app and will display at 

### localhost:3000

# Config
This is how I am connecting to my Database, the token is hidden in a config.json file but the rest of the code shows how one would connect.
If you wish to use your own data following the same schema, you just replace token with whatever your connection string is.

# Models
This is the schemas for the database models for Plants, Events, and Harvests are stored. These are for reference for what each database model looks like and the names for each component.

# Public
The CSS files just for cosmetic purposes on each of the pages to make them look nicer and for the information to display in a nice way.

# Routes
The Express functions that call information requested to the webpage specified. These do the calls such as displaying all plants, or displaying events in between specified dates or even the harvest information requested.

# Views
The EJS files are what is displayed on the web browser. This is similar to HTML and runs the same formatting as HTML. This is basically how the code will work on the web browser so it knows what information to correctly display, and where to send the user when they click on a specific button.
