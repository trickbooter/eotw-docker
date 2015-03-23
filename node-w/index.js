var express = require('express'),
    nconf = require('nconf'),
    moment = require('moment'),
    redis = require('redis'),
    util = require('util');

nconf.argv()
     .env();

// constants
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
        tmrPush();
    });

global.ctr = 0;

var tmrPush = function() {
  var intr = Math.round(Math.random() * 100)/100;
  var item = ctr.toString() + ' : ' + intr.toString() + " pushed @ " + moment().format("HH:mm:ss.SS");
  console.log('pushing ctr ' + global.ctr.toString() + ' ' + intr.toString() + '...');
  client.lpush('myList', item);
  global.ctr = global.ctr + 1
  setTimeout(tmrPush, 3000*intr);
}

console.log('Running random push app');
