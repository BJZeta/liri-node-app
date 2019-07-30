require("dotenv").config();

var keys = require('./keys');
var axios = require('axios');
var Spotify = require('node-spotify-api')

var spotify = new Spotify(keys.spotify);

var input = process.argv[2];

var search_term = process.argv.slice(3).join(" ");



if (input === "concert-this") {
    var concertURL = "https://rest.bandsintown.com/artists/" + search_term + "/events?app_id=codingbootcamp"
    axios.get(concertURL).
        then(function (response) {
            var band_in_town = response.data;
            console.log(band_in_town);
        })
} else if (input === "spotify-this") {
    spotify.search({ type: 'track', query: search_term })
        .then(function (response) {
            var track = response.tracks.items[0]
            console.log('\n--------------------------------\n');
            console.log("Artist Name: " + track.artists[0].name);
            console.log('--------------------------------');
            console.log("Song Name : " + track.name);
            console.log('--------------------------------');
            console.log("Preview Link : " + track.external_urls.spotify);
            console.log('--------------------------------');
            console.log("Album: " + track.album.name);
            console.log('\n--------------------------------\n');
        })

} else if (input === "movie-this") {

} else if (input === "do-what-it-says") {

}