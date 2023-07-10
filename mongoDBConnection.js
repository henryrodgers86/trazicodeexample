const { MongoClient } = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017';
// MongoDB database name
const dbName = 'Trazi';

// Singleton pattern for MongoDB client and database instances
class MongoDB {
    constructor() {
        if (!MongoDB.instance) {
            this.client = new MongoClient(mongoURI);
            this.db = null;
            MongoDB.instance = this;
        }

        return MongoDB.instance;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(dbName);
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Failed to connect to MongoDB:', err);
            process.exit(1); // Exit the process with an error status
        }
    }

    getClient() {
        return this.client;
    }

    getDatabase() {
        return this.db;
    }

    disconnect() {
        this.client.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = new MongoDB();