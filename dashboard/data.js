let teams = [];
let games = [];
let teamsTableToggled = false;
/** Check if teams are set **/
if (localStorage.getItem("teams") !== null) {
    teams = JSON.parse(localStorage.getItem("teams"));
    console.log("Current teams in local storage:");
    console.log(teams);
}
/** Check if games are set **/
if (localStorage.getItem("games") !== null) {
    games = JSON.parse(localStorage.getItem("games"));
    console.log("Current games in local storage:");
    console.log(games);
}
/** On Page startup **/
window.onload = function() {
    loadSelectMenus();
};
/** Load teams into select menus **/
const loadSelectMenus = () => {
    const homeTeamSelector = document.getElementById('home-team-selector');
    const awayTeamSelector = document.getElementById('away-team-selector');
    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.team_name;
        option.innerHTML = team.team_name;
        homeTeamSelector.appendChild(option);
    });
    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.team_name;
        option.innerHTML = team.team_name;
        awayTeamSelector.appendChild(option);
    });
}
/** Report Game **/
const reportGame = () => {
    const formData = new FormData(document.querySelector('#report-game-form'));
    const date = formData.get('date');
    const division = formData.get('division');
    const homeTeam = formData.get('home_team');
    const homeScore = formData.get('home_score');
    const awayTeam = formData.get('away_team');
    const awayScore = formData.get('away_score');
    const gameReport = {"date":date, "division":division, "home_team":homeTeam, "home_score":homeScore, "away_team":awayTeam, "away_score":awayScore};
    games.push(gameReport);
    localStorage.setItem("games", JSON.stringify(games));
    document.getElementById('report-game-message').style.display = 'block';
    document.getElementById("report-game-form").reset();

}
/** Create Team **/
const submitTeamForm = () => {
    const teamFormData = new FormData(document.querySelector('#create-team-form'));
    const teamName = teamFormData.get('team_name');
    const teamDivision = teamFormData.get('team_division');
    const newTeam = { "team_name": teamName, "team_division": teamDivision};
    updateTeams(newTeam);
}
/** Update Teams **/
const updateTeams = (newTeam) => {
    teams.push(newTeam);
    localStorage.setItem("teams", JSON.stringify(teams));
    location.reload();
}
/** Display Teams **/
const displayTeams = () => {
    document.getElementById('teams-table-body').innerHTML = "";
    teams.forEach(team => {
        const tableBody = document.getElementById('teams-table-body');
        const tr = document.createElement("tr");
        for (let i = 0; i < 2; i++) {
            const td = document.createElement("td");
            if(i == 0){
                td.innerHTML = team.team_name;
                tr.append(td);
            } else {
                td.innerHTML = team.team_division;
                tr.append(td);
            }
        }
        tableBody.append(tr);
        if(teamsTableToggled){
            document.getElementById('current-teams').style.display = "none";
            teamsTableToggled = false;
        } else {
            document.getElementById('current-teams').style.display = "block";
            teamsTableToggled = true;
        }
    });
}
