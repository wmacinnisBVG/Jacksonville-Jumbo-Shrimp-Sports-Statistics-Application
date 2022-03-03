let TEAMS = JSON.parse(localStorage.getItem("teams"));
const GAMES = JSON.parse(localStorage.getItem("games"));
const tableHeader = document.getElementById('table-header').innerHTML;
window.onload = () =>{
    pullStandings('wins');
}
const clearTable = () => {
    document.getElementById('standings-table').innerHTML = "";
    const tr = document.createElement("tr");
    tr.innerHTML = tableHeader;
    document.getElementById('standings-table').append(tr);
}
const populateTable = () => {
    const standingsTable = document.getElementById('standings-table');
    TEAMS.forEach(team =>{
        const tr = document.createElement("tr");
        const teamTd = document.createElement('td');
        const winsTd = document.createElement('td');
        const lossesTd = document.createElement('td');
        const pctTd = document.createElement('td');
        const href = document.createElement('a');
        href.innerHTML = team.team_name;
        href.setAttribute('href', `/team-score?team=${team.team_name}`);
        teamTd.append(href);
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
const changeTableIcons = (selected) => {
    let iconIds = ["w-icon", "l-icon", "pct-icon"];
    let selectedIcon;
    if(selected === 'wins'){
        selectedIcon = iconIds[0];
        delete iconIds[0];
    } else if (selected === 'losses'){
        selectedIcon = iconIds[1];
        delete iconIds[1];
    } else {
        selectedIcon = iconIds[2];
        delete iconIds[2];
    }
    iconIds.forEach((icon) => {
        document.getElementById(icon).className = '';
        document.getElementById(icon).className = 'fas fa-caret-up';
    });
    document.getElementById(selectedIcon).className = '';
    document.getElementById(selectedIcon).className = 'fas fa-caret-down';

}
const pullStandings = (filter) =>{
    clearTable();
    if(filter == 'wins'){
        changeTableIcons(filter);
        TEAMS = TEAMS.sort((a,b) => (a.wins < b.wins) ? 1 : ((b.wins < a.wins) ? -1 : 0));
        populateTable();
    } else if(filter == 'losses'){
        changeTableIcons(filter);
        TEAMS = TEAMS.sort((a,b) => (a.losses < b.losses) ? 1 : ((b.losses < a.losses) ? -1 : 0));
        populateTable();
    } else if(filter == 'pct'){
        changeTableIcons(filter);
        TEAMS = TEAMS.sort((a,b) => ((a.wins / (a.losses+a.wins)) < (b.wins / (b.losses+b.wins))) ? 1 : (((b.wins / (b.losses+b.wins)) < (a.wins / (a.losses+a.wins))) ? -1 : 0));
        populateTable();
    }

}