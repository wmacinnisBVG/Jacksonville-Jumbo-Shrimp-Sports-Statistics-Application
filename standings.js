let TEAMS = JSON.parse(localStorage.getItem("teams"));
const GAMES = JSON.parse(localStorage.getItem("games"));
window.onload = () =>{
    pullStandings('wins');
}
const pullStandings = (filter) =>{
    if(filter == 'wins'){
        TEAMS = TEAMS.sort((a,b) => (a.wins < b.wins) ? 1 : ((b.wins < a.wins) ? -1 : 0));

        const standingsTable = document.getElementById('tr-container');
        TEAMS.forEach(team =>{
            //Add Teams
            const tr = document.createElement("tr");
            const teamTd = document.createElement('td');
            const winsTd = document.createElement('td');
            const lossesTd = document.createElement('td');
            const pctTd = document.createElement('td');
            teamTd.innerHTML = team.team_name;
            tr.append(teamTd);
            winsTd.innerHTML = team.wins;
            tr.append(winsTd);
            lossesTd.innerHTML = team.losses;
            tr.append(lossesTd);
            const pct = team.wins / (team.losses+team.wins);
            pctTd.innerHTML = pct;
            tr.append(pctTd);
            standingsTable.append(tr);



        });
    }

}