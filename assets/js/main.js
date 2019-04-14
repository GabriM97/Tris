var player1_name = "";
var player2_name = "";
$(document).ready(function(){
  homePage();
  //showTris('player1');showWinner();
  addEventsOnButtons();

});

//--- INIT PAGE ---
function homePage(){
  $("#container").empty();

  var content ='\
  <img src="./assets/img/logo.png" alt="Tris logo" id="main-logo">\
  <h1 id="main-title">Tris Game!</h1> \
  <div id="form-container"> \
      <p>Player 1</p> \
      <input type="text" id="player1-label" placeholder="Name P1"> \
      <p>Player 2</p> \
      <input type="text" id="player2-label" placeholder="Name P2"> \
      <button type="button" class="btn" name="start">Start</button> \
      <button type="reset" class="btn" name="reset">Reset</button> \
    </div>';

  $("#container").append(content);
}

//--- BUTTONS START\RESET EVENT LISTENER ---
function addEventsOnButtons(){
  $(".btn").on("click", function(){
    if($(this).text() == "Start"){
      let player1 = $("#player1-label").val();
      let player2 = $("#player2-label").val();
      if(player1 == "") player1 = "Player-1";
      if(player2 == "") player2 = "Player-2";

      player1_name = player1;
      player2_name = player2;
      showTris("player1");
    }else
    if ($(this).text() == "Reset"){
      resetAll();
    }else
    if($(this).text() == "Play Again"){
      showTris((player_turn=="player1") ? "player2" : "player1");
    }else
    if($(this).text() == "Restart Game"){
      player1_score = 0;
      player2_score = 0;
      showTris("player1");
    }
  });
}

//--- RESET BUTTON ---
function resetAll(){
  $("#player1-label").val("");
  $("#player2-label").val("");
}
