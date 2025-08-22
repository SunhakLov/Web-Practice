import { APIkey } from "./config.js";

async function renderWatchlist() {
    let watchlistMovie = JSON.parse(localStorage.getItem("watchlist")) || []
    if (watchlistMovie.length === 0) {
        document.querySelector(".watchlist-dashboard").innerHTML = `<div class="emptyList">
                <p>Your watchlist is looking a little empty...</p>
                <a class="watchlist add-to-list clickable link" href="index.html" target="_parent">
                    <i class="fa-regular fa-circle-plus"></i>
                    <span>Let’s add some movies!</span>
                </a>
            </div>`
    }
    else {
        const response = await Promise.all(watchlistMovie.map(async (movie) => {
            const movieDetail = await fetch(`https://www.omdbapi.com/?apikey=${APIkey}&i=${movie}`)
            return movieDetail.json();
        }))
        console.log(response)
        let html = ''
        response.forEach((res) => {
            html += `<div class="movie-card remove">
                <img src="${res.Poster}" alt="">
                <div class="movie-info">
                    <div class="title-row flex">
                        <p class="movie-title">${res.Title}</p>
                        <div class="rating-row">
                            <i class="fa-solid fa-star"></i>
                            <p class="rating">${res.imdbRating}</p>
                        </div>
                    </div>
                    <div class="meta-row flex">
                        <p><span class="movie-lenght">${res.Runtime}</span></p>
                        <p class="movie-type">${res.Genre}</p>
                        <button class="watchlist clickable" data-movieId-remove="${res.imdbID}">
                            <i class="fa-solid fa-circle-minus"></i>
                            <span>Remove</span>
                        </button>
                    </div>
                    <div class="description-div">
                        <p class="description">${res.Plot}</p>
                    </div>

                </div>
            </div>`
        })
        document.querySelector(".watchlist-dashboard").innerHTML = html
    }
}

renderWatchlist();

document.querySelector(".watchlist-dashboard").addEventListener("click", (e) => {
    let remove = e.target.closest(".watchlist");
    let removeId = remove.dataset.movieidRemove;
    removeWatchlist(removeId);
})

function removeWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    if (watchlist.length === 0) return;
    let newWatchlist = watchlist.filter(movieID => movieID !== id)
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
    renderWatchlist();
}