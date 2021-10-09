var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const meaningCloudApiKey = "54d3d886e269d58d09945623e4e88bc6"

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

// Post route to post the Weather information
app.get('/callMeaningCloud', (req, res) => {
    Object.assign(projectData, req.body);
    res.send(projectData);
});