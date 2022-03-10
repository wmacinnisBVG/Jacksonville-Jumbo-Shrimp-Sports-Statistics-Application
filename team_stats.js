const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const team = urlParams.get('team')

document.getElementById('page-header').innerHTML = `${team} Games`;

let cols = [];
let pages = [];
let selectedPage = 0;
let games = JSON.parse(localStorage.getItem("games"));
window.onload = function() {
    games =  games.filter(function(game) {
        return game.home_team == team || game.away_team == team;
    });

    loadScores();
    pagination();
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
        newCol.classList.add("is-half");
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
        cols.push(newCol);
    });
}

const pagination = () =>{
    const paginationList = document.getElementById('pagination-list');
    const numOfScores = cols.length;
    const numOfPages = Math.ceil(cols.length/10);
    for (let pageNum = 0; pageNum < numOfPages; pageNum++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        if(pageNum == 0){
            a.className = "pagination-link is-current";
        } else {
            a.className = "pagination-link";
        }
        a.innerHTML = pageNum+1;
        a.onclick = function() {
            moveToPage(pageNum, "page-button-"+pageNum);
        }
        a.id = "page-button-"+pageNum;
        li.append(a);
        paginationList.append(li);
    }
    for(let page=1; page<numOfPages+1; page++){
        pages.push([]);
    }
    let colsCount = 0;
    let pageCount = 0;
    cols.forEach((column) => {
        if(pageCount<numOfPages){
            if(colsCount==10){
                pageCount++;
                colsCount=0;
            }
            pages[pageCount].push(column);
            colsCount++;

        }
    });
    pages[selectedPage].forEach((page) =>{
        document.getElementById('score-container').append(page);
    });
}
const moveToPage = (page, buttonId) => {
    document.getElementById('score-container').innerHTML = "";
    pages[page].forEach((page) =>{
        document.getElementById('score-container').append(page);
    });
    for(let x=0; x<pages.length; x++){
        document.getElementById("page-button-"+x).className = "pagination-link";
    }
    document.getElementById(buttonId).className = "pagination-link is-current";
}
