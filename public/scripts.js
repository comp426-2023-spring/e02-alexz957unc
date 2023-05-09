// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

const rps_rules = `Rules for Rock Paper Scissors:
  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock CRUSHES Scissors`

const rpsls_rules = `Rules for Rock Paper Scissors Lizard Spock:
  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock SMOOSHES Lizard
  - Lizard POISONS Spock
  - Spock SMASHES Scissors
  - Scissors DECAPITATES Lizard
  - Lizard EATS Paper
  - Paper DISPROVES Spock
  - Spock VAPORIZES Rock
  - Rock CRUSHES Scissors`

function rulesRPS() {
    alert(rps_rules);
}

function rulesRPSLS() {
    alert(rpsls_rules);
}

function rpsOpponent(move) {
    const url = "/app/rps/play/" + move
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function rpslsOpponent(move) {
    const url = "/app/rpsls/play/" + move
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function rpsRandom() {
    const url = "/app/rps"
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function rpslsRandom() {
    const url = "/app/rpsls"
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function getMove() {
    var gameSelection = document.getElementsByName("randomGame");
    var game = null;
    
    for (var i = 0; i < gameSelection.length; i++) {
    if (gameSelection[i].checked) {
        game = gameSelection[i].value;
        break;
        }
    }
    const isRPS = game=="RPS" ? true : false; 

    if (isRPS) {
        rpsRandom().then(move => {
            document.getElementById("draw").value = move.player;
        })
    } else {
        rpslsRandom().then(move => {
            document.getElementById("draw").value = move.player;
        })
    }
}



function play() {
    var gameSelection = document.getElementsByName("game");
    var drawSelection = document.getElementsByName("selectedMove");

    var game = null;
    var move = null;
    
    for (var i = 0; i < gameSelection.length; i++) {
    if (gameSelection[i].checked) {
        game = gameSelection[i].value;
        break;
        }
    }
    const isRPS = game=="RPS" ? true : false; 

    for (var i = 0; i < drawSelection.length; i++) {
        if (drawSelection[i].checked) {
            move = drawSelection[i].value;
            break;
        }
    }

    var result = null;
    var playerMove = null;
    var computerMove = null;
    if (isRPS) {
        rpsOpponent(move).then(someVal => {
            result = someVal.result;
            playerMove = someVal.player;
            computerMove = someVal.opponent;
            document.getElementById("gameResult").value = result;
            document.getElementById("playerMove").value = playerMove;
            document.getElementById("computerMove").value = computerMove;
            setResultBackground(result);
        });
    } else {
        rpslsOpponent(move).then(someVal => {
            result = someVal.result;
            playerMove = someVal.player;
            computerMove = someVal.opponent;
            document.getElementById("gameResult").value = result;
            document.getElementById("playerMove").value = playerMove;
            document.getElementById("computerMove").value = computerMove;
            setResultBackground(result);
        });
    }
}

function setResultBackground(result) {
    if (result == "win") {
        document.getElementById("gameResult").style.backgroundColor = "cyan";
    } else if (result == "lose") {
        document.getElementById("gameResult").style.backgroundColor = "red";
    } else if (result == "tie") {
        document.getElementById("gameResult").style.backgroundColor = "lightgreen";
    }
}

function enableRPSLS() {
    var gameSelection = document.getElementsByName("game");
    var game = null;
    
    for (var i = 0; i < gameSelection.length; i++) {
    if (gameSelection[i].checked) {
        game = gameSelection[i].value;
        break;
        }
    }
    const isRPS = game=="RPS" ? true : false; 

    const lizardOption = document.getElementById("lizardOption");
    const spockOption = document.getElementById("spockOption");
    const rockOption = document.getElementById("rockOption");
    lizardOption.disabled = isRPS;
    spockOption.disabled = isRPS;
    if (lizardOption.disabled) {
        lizardOption.checked = false;
        spockOption.checked = false;
        rockOption.checked = true;
    }
}

function reset() {
    var gameSelection = document.getElementsByName("game");
    var drawSelection = document.getElementsByName("selectedMove");
    var randomGameSelection = document.getElementsByName("randomGame");

    for(var i=0; i<gameSelection.length; i++) {
        gameSelection[i].checked = false;
    }

    for (var i=0; i<drawSelection.length; i++) {
        drawSelection[i].checked = false;
    }

    for (var i=0; i<randomGameSelection.length; i++) {
        randomGameSelection[i].checked = false;
    }

    document.getElementById("draw").value = null;
    document.getElementById("gameResult").value = null;
    document.getElementById("playerMove").value = null;
    document.getElementById("computerMove").value = null;
    location.reload();
}