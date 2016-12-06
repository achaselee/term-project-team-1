/**
 * Created by jose ortiz on 12/4/16.
 */

$(document).ready(function()
{
    initMultiplayerSocket();
});

function initMultiplayerSocket ()
{
    var multiplayerSocket = io();
    var gameid = getParameterByName("gameid");
    multiplayerSocket.emit("multiplayer", gameid);
}

function updateScore (newscore)
{
    var updatedScoreSocket = io();
    var gameid = getParameterByName("gameid");
    updatedScoreSocket.emit("updateScore", score, gameid);
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getPlayerInfo (playerid)
{
    var playerInfo = {id: 0, name: "", isPlaying: false, score: 0};
    var playerurl = '/dbapi/users/' + playerid;
    $.getJSON( playerurl , function (data) {
        if (data['status'] == 'success') {
            // For each item in our JSON, add a table row and cells to the content strin
            var player = data['users'][0];
            playerInfo.id = player.id;
            playerInfo.name = player.name;
            playerInfo.score = player.score;
            playerInfo.isPlaying = false;

        }
        return playerInfo;
    });
}

function changeScoreInPugAttribute (playerid, newScore)
{
    var player1 = getParameterByName("player1");
    var player2 = getParameterByName("player2");
    // Empty content string
    var tableContent = '';


                if (playerid == player1) {

                    tableContent += '<tr>';
                    tableContent += '<td>' + newScore + '</td>';
                    tableContent += '<td> 0 </td>';
                    tableContent += '</tr>';
                }
                else {
                    tableContent += '<tr>';
                    tableContent += '<td> 0 </td>';
                    tableContent += '<td>' + newScore + '</td>';
                    tableContent += '</tr>';
                }


                // Inject the whole content string into our existing HTML table
                $('#score table tbody').html(tableContent);
}



