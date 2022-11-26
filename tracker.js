//Array of all players
var playerlist = [];

//Array of selected players
var selectedPlayers = [];

//Logic and math to calculate and create the string for display
function GiveTimeString(remSeconds) {
    var secs = remSeconds % 60;
    remSeconds = remSeconds - secs;

    var mins = (remSeconds / 60) % 60;
    remSeconds = remSeconds / 60 - mins;

    var hrs = remSeconds / 60;

    if (hrs < 10) hrs = "0" + hrs;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    return hrs + ":" + mins + ":" + secs;
}

//takes in the button that was clicked, switches the button, loops throgh list of players
// and changes player status where the id of button matches the id of the player
function PausePlayToggle(elem, id) {
    const players = Store.getPlayers();

    if (elem.innerHTML == "Pause") {
        elem.outerHTML =
            `<a href="" class='btn btn-success' id="shift-${id}" onclick='PausePlayToggle(this, ${id})'>Play</a>`;
        players.forEach((player) => {
            if (player.playerID == id) {
                player.status = 0;
                document.getElementById(`${player.playerID}`).classList.toggle("table-warning", false);
                document.getElementById(`${player.playerID}`).classList.toggle("table-primary", false);
            }
            localStorage.setItem('players', JSON.stringify(players));
        });

    } else if (elem.innerHTML == "Play") {
        elem.outerHTML =
            `<a href="" class='btn btn-warning' id="shift-${id}" onclick='PausePlayToggle(this, ${id})'>Pause</a>`;

        players.forEach((player) => {
            if (player.playerID == id) {
                player.status = 1;
                document.getElementById(`${player.playerID}`).classList.toggle("table-warning", true);
                document.getElementById(`${player.playerID}`).classList.toggle("table-primary", true);
            }
        });
        localStorage.setItem('players', JSON.stringify(players));
    }
}

// Gets players from storage, loops through the players, if the status is 1, find the watch that matches that player id
// change that watches inner HTML by running GiveTimeString(), change the objects TOI, send back to local storage
function updateClocks() {

    const players = Store.getPlayers();

    players.forEach((player) => {
        if (player.status !== 0) {
            player.playerCurTime += 1;
            var tempId = `watch${player.playerID}`
            document.getElementById(tempId).innerHTML = GiveTimeString(player.playerCurTime - player.playerStartTime);
            player.playerTOI = document.getElementById(tempId).innerText;
        }
    });

    localStorage.setItem('players', JSON.stringify(players));
}

//Every second fire the updateClocks function
setInterval(updateClocks, 1000);

//Player object
class Playerrow {
    constructor(
        playername,
        playernumber,
        playerposition,
        playerTOI = "00:00:00",
        playerPlusMinus = 0,
        playerShots = 0,
        playerHits = 0,
        playerBlocks = 0,
        status = 0, // 0 -> pause state 1 -> play state
        playerID = Date.now(),
        playerStartTime = Date.now(),
        playerCurTime = Date.now(),
    ) {
        this.playername = playername;
        this.playernumber = playernumber;
        this.playerposition = playerposition;
        this.playerTOI = playerTOI;
        this.playerPlusMinus = playerPlusMinus;
        this.playerShots = playerShots;
        this.playerHits = playerHits;
        this.playerBlocks = playerBlocks;
        this.status = status;
        this.playerID = playerID;
        this.playerStartTime = playerStartTime;
        this.playerCurTime = playerCurTime;

    }
}

//UI Class: Handle UI Tasks
class UI {

    // Display players on Dom
    static displayPlayers() {


        const players = Store.getPlayers();

        players.forEach((player) => UI.addPlayerToTable(player));
        UI.totalStats();

    }


    //Display players on Dom from user input
    static addPlayerToTable(player) {

        const list = document.querySelector('#player-table');
        const row = document.createElement('tr');
        row.id = `${player.playerID}`;
        row.className = 'dragthing';

        var pausePlayButtonStr = function (status) {
            if (status == 1) {
                return (
                    `<a href="" class='btn btn-warning' id="shift-${player.playerID}" onclick='PausePlayToggle(this, ${player.playerID})'>Pause</a>`
                );
            } else {
                return (
                    `<a href=""  class='btn btn-success' id="shift-${player.playerID}"  onclick='PausePlayToggle(this,
                ${player.playerID})'>Play</a>`
                );
            }
        };

        row.innerHTML = `
            <td scope="row">${player.playername}</td>
            <td >${player.playerposition}</td>
            <td >${player.playernumber}</td>
            <td id="watch${player.playerID}" >
                ${GiveTimeString(player.playerCurTime - player.playerStartTime)}
            </td>
            <td data-label="+/-">
                <a href="#" class="btn stats plusminus remove"> - </a> 
                    <span id="${player.playerID}PlusMinus">${player.playerPlusMinus}</span>
                <a href="#" class="btn stats plusminus add"> + </a> 
            </td>
            <td data-label="Shots">
                <a href="#" class="btn stats shots remove"> - </a> 
                    <span id="${player.playerID}Shots">${player.playerShots}</span>
                <a href="#" class="btn stats shots add"> + </a> 
            </td>
            <td data-label="Hits">
                <a href="#" class="btn stats hits remove"> - </a> 
                    <span id="${player.playerID}Hits">${player.playerHits}</span>
                <a href="#" class="btn stats hits add"> + </a> 
            </td>
            <td data-label="Blocks">
                <a href="#" class="btn stats blocks remove"> - </a> 
                    <span id="${player.playerID}Blocks">${player.playerBlocks}</span>
                <a href="#" class="btn stats blocks add"> + </a> 
            </td>
            <td>
              <button type="" class="btn btn btn-secondary select">
                <i class="fas fa-check-circle select"></i>
              </button>   
            </td>
            <td>
                ${pausePlayButtonStr(player.status)}
            </td>
            <td>
                <button type="" class="btn btn btn-danger delete">
                    <i class="fas fa-user-minus"></i>
                </button>
            </td>
        `;

        list.appendChild(row);
    }


    //Increment and Deincrement stats using buttons
    static displayStats(el) {
    

        //Handles plus/minus
        if (el.classList.contains('plusminus')) {

            if (el.classList.contains('remove')) {
                let curValue = parseInt(el.nextElementSibling.innerHTML);
                curValue = curValue - 1;
                el.nextElementSibling.innerHTML = `${curValue}`;
            }
            if (el.classList.contains('add')) {
                let curValue = parseInt(el.previousElementSibling.innerHTML);
                curValue = curValue + 1;
                el.previousElementSibling.innerHTML = `${curValue}`;
            }
        }

        //Handles shots
        if (el.classList.contains('shots')) {

            if (el.classList.contains('remove')) {
                let curValue = parseInt(el.nextElementSibling.innerHTML);
                curValue = curValue - 1;
                el.nextElementSibling.innerHTML = `${curValue}`;
            }
            if (el.classList.contains('add')) {
                let curValue = parseInt(el.previousElementSibling.innerHTML);
                curValue = curValue + 1;
                el.previousElementSibling.innerHTML = `${curValue}`;
            }
        }

        //Handles hits
        if (el.classList.contains('hits')) {

            if (el.classList.contains('remove')) {
                let curValue = parseInt(el.nextElementSibling.innerHTML);
                curValue = curValue - 1;
                el.nextElementSibling.innerHTML = `${curValue}`;
            }
            if (el.classList.contains('add')) {
                let curValue = parseInt(el.previousElementSibling.innerHTML);
                curValue = curValue + 1;
                el.previousElementSibling.innerHTML = `${curValue}`;
            }
        }

        //Handles Blocks
        if (el.classList.contains('blocks')) {

            if (el.classList.contains('remove')) {
                let curValue = parseInt(el.nextElementSibling.innerHTML);
                curValue = curValue - 1;
                el.nextElementSibling.innerHTML = `${curValue}`;
            }
            if (el.classList.contains('add')) {
                let curValue = parseInt(el.previousElementSibling.innerHTML);
                curValue = curValue + 1;
                el.previousElementSibling.innerHTML = `${curValue}`;
            }
        }

        Store.updateStats(el);

    }

    static totalStats() {
        var players = Store.getPlayers();

    
        var totalHitsAmount = function () {
            var total = 0;
            players.forEach((player) => {
                total = total + parseInt(player.playerHits);
            });
            return total;
        }
        var totalShotsAmount = function () {
            var total = 0;
            players.forEach((player) => {
                total = total + parseInt(player.playerShots);
            });
            return total;
        }
        var totalBlocksAmount = function () {
            var total = 0;
            players.forEach((player) => {
                total = total + parseInt(player.playerBlocks);
            });
            return total;
        }

        document.getElementById("totalShots").innerText = totalShotsAmount();
        document.getElementById("totalHits").innerText = totalHitsAmount();
        document.getElementById("totalBlocks").innerText = totalBlocksAmount();

    }

    //Remove player row if button clicked
    static deletePlayer(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
        if (el.classList.contains('fa-user-minus')) {
            el.parentElement.parentElement.parentElement.remove();
        }
    }


    // //Show alert
    // static showAlert(message, className) {
    //     const div = document.createElement('div');
    //     div.className = `alert alert-${className}`;
    //     div.appendChild(document.createTextNode(message));
    //     const container = document.querySelector('.container');
    //     const form = document.querySelector('#player-form');
    //     container.insertBefore(div, form);
    //     //vanish in 3 seconds
    //     setTimeout(() => document.querySelector('.alert').remove(), 
    //     3000);
    // }


    //Clear form fields after submitting
    static clearFields() {
        document.querySelector('#playerName').value = '';
        document.querySelector('#playerNumber').value = '';
        document.querySelector('#playerPosition').value = 'Player Position';
    }


}

// Handling storage
class Store {

    static getPlayers() {
        let players;

        // Check to see if there is a players array stored
        if (localStorage.getItem('players') === null) {

            //If not create an empty players array
            players = [];
        } else {

            //If true, take that array and store it in players
            players = JSON.parse(localStorage.getItem('players'));
        }

        return players;
    }

    static addPlayer(player) {
        const players = Store.getPlayers();

        players.push(player);

        localStorage.setItem('players', JSON.stringify(players));

    }

    // Removes player from local storage by matching ID
    static removePlayer(el) {

        //Get players from local storage and put in variable
        const players = Store.getPlayers();
        var playerID;

        //Get playerID from row ID
        if (el.classList.contains('delete')) {
            playerID = el.parentElement.parentElement.id;
        }
        if (el.classList.contains('fa-user-minus')) {
            playerID = el.parentElement.parentElement.parentElement.id;
        }

        //Loop through each player in local storage 
        players.forEach((player, index) => {

            //Match row ID to player in local storage and remove
            if (player.playerID == playerID) {
                players.splice(index, 1);
            }
        });

        //Send array back to local storage
        localStorage.setItem('players', JSON.stringify(players));

    }

    //update player stats in local storage
    static updateStats(el) {

        //Get players from local storage
        const players = Store.getPlayers();

        //Get playerID from row ID
        if (el.classList.contains('stats')) {
            var playerID = el.parentElement.parentElement.id;

            //Loop through each player in local storage 
            players.forEach((player) => {

                //Match row ID to player in local storage and remove
                if (player.playerID == playerID) {
                    player.playerPlusMinus = document.getElementById(`${playerID}PlusMinus`).innerText;
                    player.playerShots = document.getElementById(`${playerID}Shots`).innerText;
                    player.playerHits = document.getElementById(`${playerID}Hits`).innerText;
                    player.playerBlocks = document.getElementById(`${playerID}Blocks`).innerText;
                }
            });

        }

        //Send array back to local storage
        localStorage.setItem('players', JSON.stringify(players));

    }

}

//Select Row
function selectRow(e){
    let players = Store.getPlayers();

    if (e.classList.contains("select")){
        playerID = e.parentElement.parentElement.id;
        players.forEach((player) => {
            
            if(player.playerID == playerID){
                document.getElementById(`${player.playerID}`).classList.toggle("table-primary");
            }
         });
    }
  if (e.classList.contains("fa-check-circle")){
        playerID = e.parentElement.parentElement.parentElement.id;
        players.forEach((player) => {
            
            if(player.playerID == playerID){
                document.getElementById(`${player.playerID}`).classList.toggle("table-primary");
            }
         });
    }
}

//Play selected timers
function playSelected() {
    let players = Store.getPlayers();
    var table = document.getElementById("playerTable");
    for (var i = 0, row; row = table.rows[i]; i++) {
        if(row.classList.contains("table-primary")) {
            playerID = row.id
            players.forEach((player) => {
                if(player.playerID == playerID) {
                //    player.status = 1;
                //    localStorage.setItem('players', JSON.stringify(players));
                   PausePlayToggle(document.getElementById(`shift-${player.playerID}`), player.playerID);
                }
            });
        }
    }


}



// Pause all timers
function pauseAll() {
    let players = Store.getPlayers();

    players.forEach((player) => {
        if(player.status == 1) {
            PausePlayToggle(document.getElementById(`shift-${player.playerID}`), player.playerID);
            player.status = 0;
            console.log(player.status);
        } 
    });

     //Send array back to local storage
     localStorage.setItem('players', JSON.stringify(players));

}

// Clear All Stats
function clearAllStats() {
    let players = Store.getPlayers();
    
    players.forEach((player) => {
        player.playerTOI = "00:00:00",
        player.playerCurTime = Date.now(),
        player.playerStartTime = Date.now(),
        player.playerPlusMinus = 0,
        player.playerShots = 0,
        player.playerHits = 0,
        player.playerBlocks = 0
    });
    
    localStorage.setItem('players', JSON.stringify(players));
    location.reload();

}

// Remove all players and reload
function removeAll() {
    localStorage.removeItem('players');
    location.reload();
}



//Events: display players
document.addEventListener('DOMContentLoaded', UI.displayPlayers());



//Event: Add player object
document.querySelector('#player-form').addEventListener('submit', (e) => {
    //Prevent default form submit
    e.preventDefault();


    //Get form values
    const playername = document.querySelector('#playerName').value;
    const playernumber = document.querySelector('#playerNumber').value;
    const playerposition = document.querySelector('#playerPosition').value;

    //Validate form
    if (playername === '' || playernumber === '' || playerposition === '') {

        //Alert user to fill in all fields
        //UI.showAlert('Please fill in all fields', 'danger');

    } else {

        // Instantiate Player object
        const player = new Playerrow(playername, playernumber, playerposition);

        //Add player to array
        playerlist.push(player);

        //Add player to table
        UI.addPlayerToTable(player);

        //Add player to storage
        Store.addPlayer(player);

        //Clear form fields
        UI.clearFields();

    }

});


//Event: Remove a player
document.querySelector('#player-table').addEventListener('click', (e) => {

    //Stops submit
    e.preventDefault();

    //Select Row
    selectRow(e.target);

    //Removes player from display
    UI.deletePlayer(e.target);

    //Removes player from local storage
    Store.removePlayer(e.target);

    //Updates stats column in display
    UI.displayStats(e.target);

    //Total Stats on display
    UI.totalStats();

    //Updates player stats in local storage
    //Store.updateStats(e.target);

});



