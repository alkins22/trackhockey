function exportData() {
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("playerTable");

    /* Declaring array variable */
    var players = JSON.parse(localStorage.getItem('players'));

    rows = [];
    players.forEach((player) => {
        row = `${player.playername}, ${player.playernumber}, ${player.playerTOI}, ${player.playerShots}, ${player.playerHits}, ${player.playerBlocks}`;
        rows.push(row);
    });

    rows.unshift(["Name", "Number", "TOI", "Shots", "Hits", "Blocks"]);
    rows.push(["Totals", "", "", `${document.getElementById("totalShots").innerText}`, `${document.getElementById("totalHits").innerText}`, `${document.getElementById("totalBlocks").innerText}`])


    csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (row) {
        csvContent += row + "\r\n";
    });

    /* create a hidden <a> DOM node and set its download attribute */
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "TrackHockeyReport.csv");
    document.body.appendChild(link);

    /* download the data file named "Stock_Price_Report.csv" */
    link.click();
}