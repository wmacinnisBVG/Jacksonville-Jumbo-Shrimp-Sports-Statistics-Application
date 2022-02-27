let games = JSON.parse(localStorage.getItem("games"));
window.onload = function() {
    loadScores();
}
const filter = () =>{
    const fromDate = document.getElementById('from-filer').value;
    const toDate = document.getElementById('to-filter').value;
    const newGames = games.filter(games => (game.date >= 1980 && game.start < 1990));

}
const loadScores = () =>{
    games.forEach(game => {
        let homeScoreTick = '';
        let awayScoreTick = '';
        //Check winner
        if(parseInt(game.home_score) > parseInt(game.away_score)){
            homeScoreTick = '<i class="fas fa-caret-left" style="color:red"></i>';
        } else if(parseInt(game.home_score) < parseInt(game.away_score)) {
            awayScoreTick = '<i class="fas fa-caret-left" style="color:red"></i>';
        }
        //Create elements
        const newCol = document.createElement("div");
        newCol.classList.add("column");
        newCol.classList.add("is-one-third");
        const card = `
            <div class="column">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <p><b>RECAP</b> - ${ game.date }</p>
                                    <hr>
                                    <nav class="level">
                                        <!-- Left side -->
                                        <div class="level-left">
                                            <div class="level-item">
                                                <p class="subtitle is-3">
                                                    <strong>${game.home_score}</strong>&nbsp;&nbsp;${homeScoreTick}
                                                </p>
                                            </div>
                                        </div>
                                        <!-- Right side -->
                                        <div class="level-right">
                                            <p class="subtitle is-3">
                                                ${game.home_team}
                                            </p>
        
                                        </div>
                                    </nav>
        
                                    <nav class="level">
                                        <!-- Left side -->
                                        <div class="level-left">
                                            <div class="level-item">
                                                <p class="subtitle is-3">
                                                    <strong>${game.away_score}</strong>&nbsp;&nbsp;${awayScoreTick}
                                                </p>
                                            </div>
                                        </div>
        
                                        <!-- Right side -->
                                        <div class="level-right">
                                            <p class="subtitle is-3">
                                                ${game.away_team}
                                            </p>
        
                                        </div>
                                    </nav>
                                    <hr>
                                    <p>${game.away_team} @ ${game.home_team}</p>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
        newCol.innerHTML = card;
        document.getElementById('score-container').append(newCol);
    });


}