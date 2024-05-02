// Getting HTML Elements
const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('input');

// Function To Fetch Movie Details Using OMDB API
const getMovieInfo = async (movie) => {
    try{
        const myApiKey = "904da669";
        const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        showMovieData(data);
    }
    catch{
        movieContainer.innerHTML = "<h2> No Movie Found, Please Write The Correct Movie Name</h2>";
        movieContainer.classList.add('no-background');
        movieContainer.style.width = "auto";
    }
}

// Function To Show Movie Data On Screen
const showMovieData = (data) => {
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, Country} = data;

    movieContainer.innerHTML = "";
    movieContainer.classList.remove('no-background');
    movieContainer.style.width = "80%";

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach((element) => {
        const div = document.createElement('div');
        div.innerText = element;
        movieGenreElement.appendChild(div);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                             <p><strong>Duration: </strong>${Runtime}</p>
                             <p><strong>Country: </strong>${Country}</p>
                             <p><strong>Cast: </strong>${Actors}</p>
                             <p><strong>Plot: </strong>${Plot}</p>`;

    const watchMovieContainer = document.createElement('div');
    const watchMovie = document.createElement('div');
    watchMovieContainer.classList.add('watch-movie-container');
    watchMovie.classList.add('watch-movie');
    watchMovieContainer.appendChild(watchMovie);
    const movieTitle = Title.replace(/ /g, "-");
    const a = document.createElement('a');
    a.innerHTML = "Watch";
    a.href = `https://myflixerz.to/search/${movieTitle}`;
    a.target = "_blank";
    watchMovie.appendChild(a);
    movieElement.appendChild(watchMovieContainer);

    // Creating Movie Poster Div
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

// Adding Event With Form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ""){
        getMovieInfo(movieName);
    }
    else {
        movieContainer.innerHTML = "<h2> Please Enter Movie Name To Get Movie Guide </h2>";
        movieContainer.classList.add('no-background');
        movieContainer.style.width = "auto";
    }
})