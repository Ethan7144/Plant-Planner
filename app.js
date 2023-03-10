// Grabbing the necessary modules
const express = require('express')
const app = express()
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const plantsRouter = require('./routes/plants')
const addPlantRouter = require('./routes/addplant');
const plantUpdateRouter = require('./routes/updatePlant');
const plantNameRouter = require('./routes/plantbyname');
const plantStatusRouter = require('./routes/isPlantAlive');
const registerEventRouter = require('./routes/registerEvent');
const eventListRouter = require('./routes/listEvents');
const registerHarvestRouter = require('./routes/recordHarvest');
const harvestListRouter = require('./routes/listHarvest');
const harvestDateRouter = require('./routes/harvestByDate');
// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Home page route
app.get('/', (req, res) => {
  res.render('home', { title: 'My Plants' });
});

// Plants collection routes
app.use('/plants', plantsRouter); // GET all plants
app.use('/plant/new', addPlantRouter); // POST a new plant')
app.use('/plant', plantUpdateRouter); // POST a new name for a specific plant
app.use('/plants/search', plantNameRouter); // GET a specific plant by its name

// Plant status routes
app.use('/plants', plantStatusRouter); // POST to update the status of a specific plant

// Plant events routes
app.use('/plants/:id/events', eventListRouter); // GET all events for a specific plant
app.use('/plants/:id/events/new', registerEventRouter); // POST a new event for a specific plant

// Plant harvest routes
app.use('/plants/:id/harvests', harvestListRouter); // GET all harvests for a specific plant
app.use('/plants/:id/harvests/new', registerHarvestRouter); // POST a new harvest for a specific plant
app.use('/plants/harvests/search', harvestDateRouter); // GET all harvests by date range


app.listen(3000, () => {
  console.log('Server started on port 3000')
});
