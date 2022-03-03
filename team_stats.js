const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const team = urlParams.get('team')
console.log(team);
// shirt
