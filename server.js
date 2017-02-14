var express = require('express');
var cluster = require('cluster');


var app = express();

// If we are in mater process run this code
// The first line normally executes when the nodejs server instantiate for the first time
if (cluster.isMaster){
  // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

}else{
  // Include Express
    var express = require('express');

    // Create a new Express application
    var app = express();

    // Add a basic route – index page
    app.get('/', function (req, res) {
      // Which woker is serving the page.
      res.send('Hello from Worker ' + cluster.worker.id);
    });

    // Bind to a port
    app.listen(4000);
    console.log('Application running!');

}
