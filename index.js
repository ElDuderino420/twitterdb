const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require('assert');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'social_net'

const app = express();


MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log("Connected to database");

    const db = client.db(dbName);
    const tweets = db.collection('tweets');

    app.listen(3000, () => console.log("Server listening on port 3000"));

    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/users', (req,res) => {
        twitterUsers(list => res.send(JSON.stringify(list.length)));
    });
    app.get('/mensions', (req,res) => {
        twitterMensions(mensions => res.send(JSON.stringify(mensions)));
    });

    function twitterUsers(callback){
        tweets.distinct('user').then(list => {
            callback(list);
        });
    }

    function twitterMensions(callback){
        tweets.aggregate(
            [{$group:{_id:"$user",mensions:{$sum:{$size:{$split:["$text","@"]}}}}},
            {$sort:{mensions:-1}},
            {$limit: 10}]).toArray((err, mensions) => {
                if(err) console.log(err)
                else callback(mensions);
            });      
    }

    function twitterMensioned(callback){
        tweets.aggregate(
            
        )
    }

    //client.close();
})







