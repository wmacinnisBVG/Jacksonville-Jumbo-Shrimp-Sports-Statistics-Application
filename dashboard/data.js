/** Create Team **/


const submitTeamForm = () => {
    const teamFormData = new FormData(document.querySelector('#create-team-form'));
    const values = teamFormData.values();
    console.log(JSON.stringify(teamFormData));
    return;
}