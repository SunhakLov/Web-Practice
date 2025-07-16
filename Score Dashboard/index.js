const homeScoreEL = document.getElementById("home-score");
const guestScoreEL = document.getElementById("guest-score");

let homeScore = 0;
let guestScore = 0;

function home(addFactor) {
    homeScore += addFactor;
    homeScoreEL.textContent = homeScore;
}

function guest(addFactor) {
    guestScore += addFactor;
    guestScoreEL.textContent = guestScore;
}

function reset() {
    homeScore = 0;
    guestScore = 0;

    homeScoreEL.textContent = homeScore;
    guestScoreEL.textContent = guestScore;
}