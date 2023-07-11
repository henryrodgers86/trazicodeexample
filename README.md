# trazicodeexample
Code work example for Trazi hiring team

This code uses MongoDB to persist data across server sessions. This code assumes mongod is installed and running on the default port 'mongodb://127.0.0.1:27017'. It assumes that there is a database called "Trazi" and that the database contains a collection called "populations". See the Trazi.populations.json file for the database documents.

Steps to use this code:

1. make sure that node.js is installed and working on the local environment
2. clone this repository to a new directory on your local machine
3. navigate to that directory and enter command "npm install"
4. in the same directory, enter command "npm run"
5. Verify the message that the server has connected to the mongodb and is running the server on port 5555
6. Send your GET or PUT requests to the server at http://localhost:5555
    e.g. GET request - http://localhost:5555/api/population/state/Florida/city/Orlando
    e.g. PUT request - http://localhost:5555/api/population/state/Florida/city/Newcity (note: attach the population to be added as a plain text number in the body of the PUT request)

Dependencies:
- nodejs
- expressjs
- mongodb
