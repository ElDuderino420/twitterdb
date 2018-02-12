const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require('assert');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'social_net'
const colName = 'tweets'

const app = express();


MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log("Connected to database");

    const db = client.db(dbName);
    const tweets = db.collection(colName);

    app.listen(3000, () => console.log("Server listening on port 3000"));

    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/users', (req,res) => {
        twitterUsers(list => res.send(JSON.stringify(list.length)));
    });

    app.get('/mentions', (req,res) => {
        twitterMentions(mentions => res.send(JSON.stringify(mentions)));
    });

    app.get('/mentioned', (req,res) => {
        twitterMentioned(top => res.send(JSON.stringify(top)));
    });

    app.get('/active', (req,res) => {
        twitterActive(active => res.send(JSON.stringify(active)));
    });

    app.get('/grumpy', (req,res) => {
        twitterPolarity(1, top => res.send(JSON.stringify(top)));
    });

    app.get('/happy', (req,res) => {
        twitterPolarity(-1, top => res.send(JSON.stringify(top)));
    });

    function twitterUsers(callback){
        tweets.distinct('user').then(list => {
            callback(list);
        });
    }

    function twitterMentions(callback) {
        tweets.aggregate([
            { $group: { _id: "$user", mentions: { $sum: { $subtract: [{ $size: { $split: ["$text", "@"] } }, 1] } } } },
            //{ $match: { text: {$regex: /@/}}},
            //{ $group: { _id: "$user", mentions: { $match: { $count: {  } } } } },
            { $sort: { mentions: -1 } },
            { $limit: 10 }
        ]).toArray((err, mentions) => {
            if (err) console.log(err)
            else callback(mentions);
        });
    }

    function twitterMentioned(callback){
        tweets.aggregate([
            { $addFields: { words: { $split: ["$text", " "] } } },
            { $unwind: "$words" },
            { $match: { words: { $regex: "@.", $options: 'm' } } },
            { $group: { _id: "$words", mentioned: { $sum: 1 } } },
            { $sort: { mentioned: -1 } },
            { $limit: 5 }],
            { allowDiskUse: true }).toArray((err, top) => {
                if (err) console.log(err)
                else callback(top);
            });
    }

    function twitterActive(callback){
        tweets.aggregate([
            { $group: { _id: "$user", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 10 }],
            { allowDiskUse: true }).toArray((err, active) => {
                if (err) console.log(err)
                else callback(active);
            });
    }




    function twitterPolarity(pol, callback){
        tweets.aggregate([
            {$group:{_id:"$user", avg: {$avg: "$polarity"}}},
            {$sort: {avg: pol}},
            {$limit: 5}],
            { allowDiskUse: true }).toArray((err, top) => {
                if (err) console.log(err)
                else callback(top);
        });
        
    }

    //client.close();
})







