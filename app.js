const express = require('express');
const app = express();
const port = 5555;

// Require custom MongoDB file which handles the database connection
const mongoDBConnection = require('./mongoDBConnection');

// Set to text so we can recieve the body as a plain number
app.use(express.text());

// Bring in the population controller to handle the database operations
const populationController = require('./population.controller');

app.get('/api/population/state/:state/city/:city', (req, res) => {
    populationController.fetchPopulation(req.params.state, req.params.city, res)
        .then(() => {
            console.log('Fetch operation complete.')
        })
        .catch((error) => {
            console.log('Error occured while performing GET operation.');
            console.log(error);
        });
});

app.put('/api/population/state/:state/city/:city', (req, res) => {
    populationController.updatePopulation(req.params.state, req.params.city, req.body, res)
        .then(() => {
            console.log('Put operation complete.')
        })
        .catch((error) => {
            console.log('Error occured while performing PUT operation.');
            console.log(error);
        });
});

app.listen(port, async () => {
    await mongoDBConnection.connect(); 
    console.log(`Example app listening on port ${port}`)
});