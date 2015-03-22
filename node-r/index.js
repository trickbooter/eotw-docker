var express = require('express'),
    nconf = require('nconf'),
    moment = require('moment'),
    redis = require('redis'),
    util = require('util');

nconf.argv()
     .env();

// constants
var httpPort = 8080;
var redisHost = nconf.get('REDIS_IP'); //get from env or etcd
var redisPort = 6379;

// configure redis
var client = redis.createClient(redisPort, redisHost); //creates a new client

client.on('error', function (err) {
        console.log("Error " + err);
        exit;
    });

client.on('connect', function() {
        console.log('connected');
    });

// http App
var app = express();

app.get('/', function (req, res) {
  // build response
  var page = util.format('<h1>Hello EotW @ %s</h1>', moment().format('MMMM Do YYYY, HH:mm:ss'));
  page += util.format('Connected to Redis %s on %s:%s</p>', client.server_info.redis_version, redisHost, redisPort);
  page += '<h3>Reading Top 5 Keys</h3></p>';

  client.lrange('myList', 0, 4, function(err, items) {
    if(err) {
      console.log('Error: ' + err)
    }
    else
    {
      page += '<ul>';
      items.forEach(function (item) {
        page += '<li>Item: ' + item.toString() + '</li>';
      });
      page += '</ul>';
      res.send(page);
    }
  });
});

app.listen(httpPort);
console.log('Running on http://localhost:' + httpPort);
