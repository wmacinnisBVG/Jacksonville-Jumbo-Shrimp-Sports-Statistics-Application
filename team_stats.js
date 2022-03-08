const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const team = urlParams.get('team')
console.log(team);

let TEAMS = JSON.parse(localStorage.getItem("teams"));
const GAMES = JSON.parse(localStorage.getItem("games"));