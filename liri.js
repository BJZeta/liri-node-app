require("dotenv").config();

var keys = require('./keys');
var axios = require('axios');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var input = process.argv[2];

var search_term = process.argv.slice(3).join(" ");



if (input === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + search_term + "/events?app_id=codingbootcamp").
        then(function (response) {
            var venueDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log('\n--------------------------------');
            console.log("Venue Information:");
            console.log('\n--------------------------------');
            console.log("Name : " + response.data[0].venue.name);
            console.log('\n--------------------------------');
            console.log("Location : " + response.data[0].venue.city + ", " + response.data[0].venue.country);
            console.log('\n--------------------------------');
            console.log("Date : " + venueDate);
            console.log('\n--------------------------------');
        })
    }
if (input === "spotify-this-song") {
    spotify.search({ type: 'track', query: search_term })
        .then(function (response) {
            var track = response.tracks.items[0]
            console.log('\n--------------------------------');
            console.log("Artist Name : " + track.artists[0].name);
            console.log('--------------------------------');
            console.log("Song Name : " + track.name);
            console.log('--------------------------------');
            console.log("Preview Link : " + track.external_urls.spotify);
            console.log('--------------------------------');
            console.log("Album : " + track.album.name);
            console.log('--------------------------------\n');
        })

} else if (input === "movie-this") {
    axios.get('https://www.omdbapi.com/?t=' + search_term + '&apikey=trilogy').
        then(function (response) {
            data = response.data;
            console.log('\n--------------------------------');
            console.log("Title : " + data.Title);
            console.log('--------------------------------');
            console.log("Release Date : " + data.Released);
            console.log('--------------------------------');
            console.log("IMDB Rating : " + data.imdbRating);
            console.log('--------------------------------');
            console.log("Rotten Tomato Rating : " + data.Ratings[0].Value);
            console.log('--------------------------------');
            console.log("Produced In : " + data.Country);
            console.log('--------------------------------');
            console.log("Language : " + data.Language);
            console.log('--------------------------------');
            console.log("Plot : " + data.Plot);
            console.log('--------------------------------');
            console.log("Cast : " + data.Actors);
            console.log('--------------------------------\n');

        }).catch(function (err) {
            console.log(err)
        })
} else if (input === "do-what-it-says") {
    fs.readFile("random.txt",'utf-8', function(err,data) {
        if(err) throw err;
        console.log(data);
        var text = data.split(',');
        spotify.search({ type: 'track', query: text[1] })
        .then(function (response) {
            var track = response.tracks.items[0]
            console.log('\n--------------------------------');
            console.log("Artist Name : " + track.artists[0].name);
            console.log('--------------------------------');
            console.log("Song Name : " + track.name);
            console.log('--------------------------------');
            console.log("Preview Link : " + track.external_urls.spotify);
            console.log('--------------------------------');
            console.log("Album : " + track.album.name);
            console.log('--------------------------------\n');
        })
    })
} else {
    console.log('\n---------------------------\n Welcome to LIRI :)')
}