// Bring in our custom MongoDB connection class to access the database
const mongoDBConnection = require('./mongoDBConnection');

class PopulationController {
  constructor() {
  }

  setupDatabaseAndQuery(state, city) {
    // Assign the connection from the custom MongoDB client
    this.db = mongoDBConnection.getDatabase();
    this.collection = this.db.collection('populations');

    // Create a query that filters by city/state and is case-insensitive
    this.cityStateFilterQuery = {
      'state': { $regex: state, $options: 'i' },
      'city': { $regex: city, $options: 'i' }
    };
  }

  /**
   * @method PopulationController.fetchPopulation()
   * @param {string} state - The name of the state - acts together with city as a database key
   * @param {string} city - The name of the city
   * @param {response} response - Express js response object to send results back to the front-end
   * @returns JSON object with a single property, "population"
   */
  async fetchPopulation(state, city, response) {

    this.setupDatabaseAndQuery(state, city);
    const result = await this.collection.findOne(this.cityStateFilterQuery);

    // If we find a result, return it, otherwise return a records not found message
    if (result && result.population) {
      return response.json({ 'population': result.population });
    }
    else {
      return response.status(400).send('No records found for ' + city + ', ' + state);
    }
  }

  /**
   * @method PopulationController.updatePopulation()
   * @param {string} state - The name of the state - acts together with city as a database key
   * @param {string} city - The name of the city
   * @param {number} population - The population value to be set in the database
   * @param {response} response - Express js response object to send results back to the front-end
   * @returns express js response with status 200, 201, or 400
   */
  async updatePopulation(state, city, population, response) {
    this.setupDatabaseAndQuery(state, city);
    try {
      const existingRecord = await this.collection.findOne(this.cityStateFilterQuery);

      // We found an existing record, so update the record and return status 200
      if (existingRecord) {
        const result = await this.collection.updateOne(this.cityStateFilterQuery, { $set: { population } });
        console.log(result.modifiedCount + ' record was modified for ' + city + ', ' + state);
        return response.send('Population updated for ' + city + ', ' + state);
      }
      // We didn't find an existing record, so insert the record and return status 201
      else {
        const result = await this.collection.insertOne({ state, city, population });
        console.log('A document was inserted with ID: ' + result.insertedId);
        return response.status(201).send('New record successfully inserted.');
      }
    }
    catch (error) {
      console.log(error);
      return response.status(400).send('An error occured while attempting to insert/update the population.');
    }
  }
}

module.exports = new PopulationController();