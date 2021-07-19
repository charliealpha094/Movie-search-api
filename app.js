// Done by Carlos Amaral (2021/07/12)

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");


const app = express();

// Recognize static files
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get("/", (req, res) => {

    res.render('home');
});

app.post("/search", (req, res) => {

    const movieName = req.body.movieName;
    //const apikey = "b69ae9f8&";
    //const url = "http://www.omdbapi.com/?apikey=" + apikey + movieName;

    const url = "https://www.omdbapi.com/?apikey=86f9dde7&t="+movieName;


    axios.get(url).then(response => {

        if (response.data.Response === "True") {
            res.render('movieDetails', {
                filmTitle: response.data.Title,
                filmYear: response.data.Year,
                filmPoster: response.data.Poster,
                filmDirector: response.data.Director,
                filmReleased: response.data.Released,
                filmRun: response.data.Runtime,
                filmPlot: response.data.Plot,
                filmActors: response.data.Actors,
                filmGenre: response.data.Genre,
                imdbRating : typeof response.data.Ratings[0] === 'undefined'? "-/-" :response.data.Ratings[0].Value,
                rottenRating : typeof response.data.Ratings[1] === 'undefined'? "-/-" :response.data.Ratings[1].Value,
                metacriticRating: typeof response.data.Ratings[2] === 'undefined'? "-/-" :response.data.Ratings[2].Value ,
                filmCountry: response.data.Country

            });
        }
        else {
            res.render('error');
        }

    });
    
});

app.post("/back", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port 8000");
});
