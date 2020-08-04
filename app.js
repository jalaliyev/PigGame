/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
   (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, 
    so that they can change the predefined score of 100. (Hint: you can read that value with the .
    value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current 
score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scroes, roundScore, activePlayer, gamePlaying;

newGame();

var lastDice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#current-' + activePlayer).textContent;
//console.log(x);
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(1 + Math.random() * 6);
    var dice2 = Math.floor(1 + Math.random() * 6);
    // 2. Display the result
    document.getElementById("dice-0").style.display = "block";
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-0").src = "./Images/dice-" + dice1 + ".png";
    document.getElementById("dice-1").src = "./Images/dice-" + dice2 + ".png";

    if (dice1 === 1 || dice2 === 1) {
      //player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    }

    // 3. Update the round score if the rolled number was NOT a 1
    else if (dice1 === dice2) {
      //Next Player
      console.log("dice1: " + dice1);
      console.log("dice2: " + dice2);
      nextPlayer();
    } else {
      //Add Score
      roundScore += dice1 + dice2;
      console.log("dice1: " + dice1);
      console.log("dice2: " + dice2);
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to Global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;
    //anything else is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-0").style.display = "none";
      document.getElementById("dice-1").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.getElementById("dice-0").style.display = "none";
  document.getElementById("dice-1").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", newGame);

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById("dice-0").style.display = "none";
  document.getElementById("dice-1").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
