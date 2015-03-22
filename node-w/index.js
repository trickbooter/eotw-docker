var express = require('express'),
    nconf = require('nconf'),
    moment = require('moment'),
    redis = require('redis'),
    util = require('util');

// constants
var httpPort = 8080;
var redisHost = '10.0.0.7'; //get from env or etcd
var redisPort = 6379;

// configure redis
var client = redis.createClient(redisPort, redisHost); //creates a new client

client.on('error', function (err) {
        console.log("Error " + err);
        exit;
    });

client.on('connect', function() {
        console.log('connected');
        tmrPush();
    });

var tmrPush = function() {
  var intr = Math.round(Math.random() * 100)/100;
  var item = intr.toString() + " pushed @ " + moment().format("HH:mm:ss.SS");
  console.log('pushing ' + intr.toString() + '...');
  client.lpush('myList', item);
  setTimeout(tmrPush, 3000*intr);
}

console.log('Running random push app');
