import { APIkey } from "./config.js"

document.querySelector(".submit").addEventListener("click", (e) => {
    e.preventDefault();
    const movieTitle = document.getElementById("movieTitle").value;
    render(movieTitle);
})

async function render(movieTitle) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&s=${movieTitle}`);
    const data = await response.json();
    console.log(data)

    if (data.Response === "False" || !data.Search) {
        document.querySelector(".movie-dashboard").innerHTML = `
        <div class="notFound">
            <p>Unable to find what you’re looking for.</p>
            <p>Please try another search.</p>
        </div>
        `
    }

    const detail = await Promise.all(data.Search.map(async (movie) => {
        const movieDetail = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&i=${movie.imdbID}`)
        return movieDetail.json()
    }))

    let movieList = ''

    detail.forEach(movie => {
        console.log(movie)
        movieList += `
                <div class="movie-card">
                    <img src=${movie.Poster} alt="movie image poster.">
                    <div class="movie-info">
                        <div class="title-row flex">
                            <p class="movie-title">${movie.Title}</p>
                            <div class="rating-row">
                                <i class="fa-solid fa-star"></i>
                                <p class="rating">${movie.imdbRating}</p>
                            </div>
                        </div>
                        <div class="meta-row flex">
                            <p><span class="movie-lenght">${movie.Runtime}</span></p>
                            <p class="movie-type">${movie.Genre}</p>
                            <button class="watchlist clickable" data-movieId="${movie.imdbID}">
                                <i class="fa-regular fa-circle-plus"></i>
                                <span>Watchlist</span>
                            </button>
                        </div>
                        <div class="description-div">
                            <p class="description">${movie.Plot}</p>
                        </div>

                    </div>
                </div>
            `
    });
    document.querySelector(".movie-dashboard").innerHTML = movieList
}

document.querySelector(".movie-dashboard").addEventListener("click", (e) => {
    const addBtn = e.target.closest(".watchlist")
    if (!addBtn) return;
    let selectedId = addBtn.dataset.movieid
    addToWatchlist(selectedId);

})


function addToWatchlist(id) {
    let watchlistMovie = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!watchlistMovie.includes(id)) {
        watchlistMovie.push(id)
        console.log(`${id} has been added`)
    };

    localStorage.setItem("watchlist", JSON.stringify(watchlistMovie));
}



