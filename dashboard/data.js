let teams = [];
let teamsTableToggled = false;
/** Check if teams are set **/
if (localStorage.getItem("teams") !== null) {
    teams = JSON.parse(localStorage.getItem("teams"));
    console.log(teams);
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
    displayTeams();
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
